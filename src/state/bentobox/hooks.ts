import { CurrencyAmount, KASHI_ADDRESS, Token, USDC_ADDRESS, WNATIVE_ADDRESS } from '@sushiswap/sdk'
import { useBentoBoxContract, useBoringHelperContract, useContract } from '../../hooks/useContract'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { BigNumber } from '@ethersproject/bignumber'
import ERC20_ABI from '../../constants/abis/erc20.json'
import { WrappedTokenInfo } from '../lists/wrappedTokenInfo'
import { e10 } from '../../functions/math'
import { easyAmount } from '../../functions/kashi'
import { getAddress } from '@ethersproject/address'
import { toAmount } from '../../functions/bentobox'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useAllTokens } from '../../hooks/Tokens'
import { useSingleCallResult } from '../multicall/hooks'
import useTransactionStatus from '../../hooks/useTransactionStatus'

export interface BentoBalance {
  address: string
  name: string
  symbol: string
  decimals: number
  balance: any
  bentoBalance: any
  wallet: any
  bento: any
}

export function useBentoBalances(): BentoBalance[] {
  const { chainId, account } = useActiveWeb3React()

  const boringHelperContract = useBoringHelperContract()

  const tokens = useAllTokens()

  const weth = WNATIVE_ADDRESS[chainId]

  const tokenAddresses = Object.keys(tokens)

  const balanceData = useSingleCallResult(boringHelperContract, 'getBalances', [account, tokenAddresses])

  const uiData = useSingleCallResult(boringHelperContract, 'getUIInfo', [
    account,
    [],
    USDC_ADDRESS[chainId],
    [KASHI_ADDRESS[chainId]],
  ])

  // IERC20 token = addresses[i];
  // balances[i].totalSupply = token.totalSupply();
  // balances[i].token = token;
  // balances[i].balance = token.balanceOf(who);
  // balances[i].bentoAllowance = token.allowance(who, address(bentoBox));
  // balances[i].nonce = token.nonces(who);
  // balances[i].bentoBalance = bentoBox.balanceOf(token, who);
  // (balances[i].bentoAmount, balances[i].bentoShare) = bentoBox.totals(token);
  // balances[i].rate = getETHRate(token);

  return useMemo(() => {
    if (
      uiData.loading ||
      balanceData.loading ||
      uiData.error ||
      balanceData.error ||
      !uiData.result ||
      !balanceData.result
    )
      return []
    return tokenAddresses
      .map((key: string, i: number) => {
        const token = tokens[key]

        const usd = e10(token.decimals).mulDiv(uiData.result[0].ethRate, balanceData.result[0][i].rate)

        const full = {
          ...token,
          ...balanceData.result[0][i],
          usd,
        }
        return {
          ...token,
          usd,
          address: token.address,
          name: token.name,
          symbol: token.symbol,
          decimals: token.decimals,
          balance: token.address === weth ? uiData.result[0].ethBalance : balanceData.result[0][i].balance,
          bentoBalance: balanceData.result[0][i].bentoBalance,
          wallet: easyAmount(
            token.address === weth ? uiData.result[0].ethBalance : balanceData.result[0][i].balance,
            full
          ),
          bento: easyAmount(toAmount(full, balanceData.result[0][i].bentoBalance), full),
        }
      })
      .filter((token) => token.balance.gt('0') || token.bentoBalance.gt('0'))
  }, [
    uiData.loading,
    uiData.error,
    uiData.result,
    balanceData.loading,
    balanceData.error,
    balanceData.result,
    tokenAddresses,
    tokens,
    weth,
  ])
}

export function useBentoBalance(tokenAddress: string): {
  value: BigNumber
  decimals: number
} {
  const { account } = useActiveWeb3React()

  const boringHelperContract = useBoringHelperContract()
  const bentoBoxContract = useBentoBoxContract()
  const tokenAddressChecksum = getAddress(tokenAddress)
  const tokenContract = useContract(tokenAddressChecksum ? tokenAddressChecksum : undefined, ERC20_ABI)

  const currentTransactionStatus = useTransactionStatus()

  const [balance, setBalance] = useState<any>()

  // const balanceData = useSingleCallResult(boringHelperContract, 'getBalances', [account, tokenAddresses])

  const fetchBentoBalance = useCallback(async () => {
    const balances = await boringHelperContract?.getBalances(account, [tokenAddressChecksum])
    const decimals = await tokenContract?.decimals()

    const amount = BigNumber.from(balances[0].bentoShare).isZero()
      ? BigNumber.from(0)
      : BigNumber.from(balances[0].bentoBalance)
          .mul(BigNumber.from(balances[0].bentoAmount))
          .div(BigNumber.from(balances[0].bentoShare))

    setBalance({
      value: amount,
      decimals: decimals,
    })
  }, [account, tokenAddressChecksum, tokenContract, boringHelperContract])

  useEffect(() => {
    if (account && bentoBoxContract && boringHelperContract && tokenContract) {
      fetchBentoBalance()
    }
  }, [account, bentoBoxContract, currentTransactionStatus, fetchBentoBalance, tokenContract, boringHelperContract])

  return balance
}

export function useBentoBalance2(account: string, token: Token): CurrencyAmount<Token> | undefined {
  const tokens = useMemo(() => [token], [token])
  const balance = useBentoBalances2(account, tokens)
  if (token && balance && balance[token.address]) {
    return balance[token.address]
  }

  return undefined
}

export function useBentoBalances2(account: string, tokens: Token[]): Record<string, CurrencyAmount<Token> | undefined> {
  const boringHelperContract = useBoringHelperContract()
  const bentoBoxContract = useBentoBoxContract()
  const currentTransactionStatus = useTransactionStatus()
  const [balances, setBalances] = useState<Record<string, CurrencyAmount<Token> | undefined>>()

  const fetch = useCallback(async () => {
    console.log(
      account,
      tokens.map((el) => el.address)
    )
    const balances = await boringHelperContract.getBalances(
      account,
      tokens.map((el) => el.address)
    )
    setBalances(
      balances.reduce((acc, balance, index) => {
        acc[tokens[index].address] = CurrencyAmount.fromRawAmount(
          tokens[index],
          balance.bentoBalance.mulDiv(balance.bentoAmount, balance.bentoShare).toString()
        )

        return acc
      }, {})
    )
  }, [boringHelperContract, account, tokens])

  useEffect(() => {
    if (!account || !bentoBoxContract || !boringHelperContract || !tokens.every((el) => el)) return
    fetch()
  }, [account, bentoBoxContract, currentTransactionStatus, fetch, boringHelperContract, tokens])

  return balances
}

export function useBentoMasterContractAllowed(masterContract?: string, user?: string): boolean | undefined {
  const contract = useBentoBoxContract()

  const inputs = useMemo(() => [masterContract, user], [masterContract, user])

  const allowed = useSingleCallResult(contract, 'masterContractApproved', inputs).result

  return useMemo(() => (allowed ? allowed[0] : undefined), [allowed])
}
