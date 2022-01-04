import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency, CurrencyAmount, NATIVE, ZERO } from '@sushiswap/core-sdk'
import Typography from 'app/components/Typography'
import SumUSDCValues from 'app/features/trident/SumUSDCValues'
import { useTridentLiquidityPositions } from 'app/services/graph'
import { useActiveWeb3React } from 'app/services/web3'
import { useBentoBalancesV2 } from 'app/state/bentobox/hooks'
import { useAllTokenBalances, useCurrencyBalance } from 'app/state/wallet/hooks'
import React, { FC, useMemo } from 'react'

export const LiquidityPositionsBalancesSum = () => {
  const { i18n } = useLingui()
  const { account, chainId } = useActiveWeb3React()

  const { data: positions } = useTridentLiquidityPositions({
    chainId,
    variables: { where: { user: account?.toLowerCase(), balance_gt: 0 } },
    shouldFetch: !!chainId && !!account,
  })

  const sum = positions?.reduce((acc, cur) => acc + cur.value, 0)

  return (
    <div className="flex border border-dark-700 bg-dark-900 rounded divide-x divide-dark-700">
      <div className="flex flex-col py-2 px-4 w-6/12">
        <Typography variant="sm">{i18n._(t`Total Value`)}</Typography>
        <Typography variant="lg" className="text-high-emphesis" weight={700}>
          ${sum?.toFixed(2) || '0.00'}
        </Typography>
      </div>
      <div className="flex flex-col py-2 px-4 w-6/12">
        <Typography variant="sm">{i18n._(t`Number of Assets`)}</Typography>
        <Typography variant="lg" className="text-high-emphesis" weight={700}>
          {positions?.length}
        </Typography>
      </div>
    </div>
  )
}

export const BentoBalancesSum = () => {
  const balances = useBentoBalancesV2()
  return <_BalancesSum amounts={balances} />
}

export const WalletBalancesSum = () => {
  const { chainId, account } = useActiveWeb3React()
  const tokenBalances = useAllTokenBalances()
  const ethBalance = useCurrencyBalance(account ? account : undefined, chainId ? NATIVE[chainId] : undefined)
  const amounts = useMemo(() => {
    const res: CurrencyAmount<Currency>[] = Object.values(tokenBalances).filter((cur) => cur.greaterThan(ZERO))

    if (ethBalance) {
      res.push(ethBalance)
    }
    return res
  }, [tokenBalances, ethBalance])

  return <_BalancesSum amounts={amounts} />
}

interface BalancesSumProps {
  amounts: (CurrencyAmount<Currency> | undefined)[]
}

const _BalancesSum: FC<BalancesSumProps> = ({ amounts }) => {
  const { i18n } = useLingui()

  return (
    <SumUSDCValues amounts={amounts}>
      {({ amount }) => {
        return (
          <div className="flex border border-dark-700 bg-dark-900 rounded divide-x divide-dark-700">
            <div className="flex flex-col py-2 px-4 w-6/12">
              <Typography variant="sm">{i18n._(t`Total Value`)}</Typography>
              <Typography variant="lg" className="text-high-emphesis" weight={700}>
                ${amount ? amount.toExact({}) : '0.00'}
              </Typography>
            </div>
            <div className="flex flex-col py-2 px-4 w-6/12">
              <Typography variant="sm">{i18n._(t`Number of Assets`)}</Typography>
              <Typography variant="lg" className="text-high-emphesis" weight={700}>
                {amounts.length}
              </Typography>
            </div>
          </div>
        )
      }}
    </SumUSDCValues>
  )
}
