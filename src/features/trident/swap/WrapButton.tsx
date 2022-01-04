import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { NATIVE, WNATIVE, WNATIVE_ADDRESS } from '@sushiswap/core-sdk'
import loadingCircle from 'animation/loading-circle.json'
import { useBentoBox, useBentoBoxContract, useWETH9Contract } from 'app/hooks'
import { useActiveWeb3React } from 'app/services/web3'
import { useTransactionAdder } from 'app/state/transactions/hooks'
import Button from 'app/components/Button'
import Dots from 'app/components/Dots'
import Typography from 'app/components/Typography'
import Lottie from 'lottie-react'
import React, { FC } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { attemptingTxnAtom, showReviewAtom } from '../context/atoms'
import useSwapAssetPanelInputs from '../context/hooks/useSwapAssetPanelInputs'
import TridentApproveGate from '../TridentApproveGate'

const WrapButton: FC = () => {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()
  const attemptingTxn = useRecoilValue(attemptingTxnAtom)
  const setShowReview = useSetRecoilState(showReviewAtom)
  const wethContract = useWETH9Contract()
  const bentoBox = useBentoBoxContract()
  const { deposit, withdraw } = useBentoBox()
  const addTransaction = useTransactionAdder()

  const {
    parsedAmounts,
    error,
    spendFromWallet: [spendFromWallet],
    receiveToWallet: [receiveToWallet],
  } = useSwapAssetPanelInputs()

  const execute = async () => {
    if (!wethContract || !parsedAmounts[0] || !chainId) return

    if (spendFromWallet && receiveToWallet) {
      let txReceipt
      if (parsedAmounts[0]?.currency.isNative) {
        txReceipt = await wethContract.deposit({ value: parsedAmounts[0].quotient.toString() })
      } else {
        txReceipt = await wethContract.withdraw(parsedAmounts[0].quotient.toString())
      }

      return addTransaction(txReceipt, {
        summary: parsedAmounts[0]?.currency.isNative
          ? i18n._(t`Wrap ${parsedAmounts[0].toSignificant(6)} ${NATIVE[chainId].symbol} to ${WNATIVE[chainId].symbol}`)
          : i18n._(
              t`Unwrap ${parsedAmounts[0].toSignificant(6)} ${WNATIVE[chainId].symbol} to ${NATIVE[chainId].symbol}`
            ),
      })
    }

    if (!spendFromWallet && receiveToWallet) {
      return await withdraw(WNATIVE_ADDRESS[chainId], parsedAmounts[0]?.quotient.toString().toBigNumber(0))
    }

    if (spendFromWallet && !receiveToWallet) {
      return await deposit(WNATIVE_ADDRESS[chainId], parsedAmounts[0]?.quotient.toString().toBigNumber(0))
    }
  }

  return (
    <TridentApproveGate inputAmounts={[parsedAmounts[0]]} tokenApproveOn={bentoBox?.address}>
      {({ approved, loading }) => {
        let disabled = !!error || !approved || loading || attemptingTxn
        let buttonTextParts = [parsedAmounts[0]?.currency.isNative ? i18n._(t`Wrap`) : i18n._(t`Unwrap`)]

        if (!spendFromWallet && receiveToWallet) buttonTextParts = [i18n._(t`Withdraw`), ...buttonTextParts]
        if (spendFromWallet && !receiveToWallet) buttonTextParts = [i18n._(t`Deposit`)]
        if (!spendFromWallet && !receiveToWallet) {
          disabled = true
          buttonTextParts = [i18n._(t`Unsupported`)]
        }

        const buttonText = attemptingTxn ? (
          <Dots>{buttonTextParts.join(' + ')}</Dots>
        ) : loading ? (
          ''
        ) : error ? (
          error
        ) : (
          buttonTextParts.join(' + ')
        )

        return (
          <div className="flex">
            <Button
              id="wrap-button"
              className="h-[48px]"
              {...(loading && {
                startIcon: (
                  <div className="w-4 h-4 mr-1">
                    <Lottie animationData={loadingCircle} autoplay loop />
                  </div>
                ),
              })}
              color="gradient"
              disabled={disabled}
              onClick={execute}
            >
              <Typography variant="sm" weight={700} className={!error ? 'text-high-emphesis' : 'text-low-emphasis'}>
                {buttonText}
              </Typography>
            </Button>
          </div>
        )
      }}
    </TridentApproveGate>
  )
}

export default WrapButton
