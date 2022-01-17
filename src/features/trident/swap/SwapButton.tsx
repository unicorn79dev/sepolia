import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import loadingCircle from 'animation/loading-circle.json'
import Button from 'app/components/Button'
import Dots from 'app/components/Dots'
import { useDerivedTridentSwapContext } from 'app/features/trident/swap/DerivedTradeContext'
import { selectTridentSwap, setTridentSwapState } from 'app/features/trident/swap/swapSlice'
import { useBentoBoxContract, useTridentRouterContract } from 'app/hooks'
import { useAppDispatch, useAppSelector } from 'app/state/hooks'
import { TradeUnion } from 'app/types'
import Lottie from 'lottie-react'
import React, { FC, useCallback } from 'react'

import TridentApproveGate from '../TridentApproveGate'

interface SwapButton {
  onClick(x: TradeUnion): void
}

const SwapButton: FC<SwapButton> = ({ onClick }) => {
  const { i18n } = useLingui()
  const dispatch = useAppDispatch()
  const tridentSwapState = useAppSelector(selectTridentSwap)
  const { attemptingTxn } = tridentSwapState
  const router = useTridentRouterContract()
  const bentoBox = useBentoBoxContract()
  const { parsedAmounts, error, trade } = useDerivedTridentSwapContext()

  const handleClick = useCallback(() => {
    onClick(trade)
    dispatch(setTridentSwapState({ ...tridentSwapState, showReview: true }))
  }, [dispatch, onClick, trade, tridentSwapState])

  return (
    <TridentApproveGate
      inputAmounts={[parsedAmounts?.[0]]}
      tokenApproveOn={bentoBox?.address}
      masterContractAddress={router?.address}
      withPermit={true}
    >
      {({ approved, loading }) => {
        const disabled = !!error || !approved || loading || attemptingTxn
        const buttonText = attemptingTxn ? (
          <Dots>{i18n._(t`Swapping`)}</Dots>
        ) : loading ? (
          ''
        ) : error ? (
          error
        ) : (
          i18n._(t`Swap`)
        )

        return (
          <div className="flex">
            <Button
              fullWidth
              id="swap-button"
              {...(loading && {
                startIcon: (
                  <div className="w-4 h-4 mr-1">
                    <Lottie animationData={loadingCircle} autoplay loop />
                  </div>
                ),
              })}
              color="gradient"
              disabled={disabled}
              onClick={handleClick}
            >
              {buttonText}
            </Button>
          </div>
        )
      }}
    </TridentApproveGate>
  )
}

export default SwapButton
