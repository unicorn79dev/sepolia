import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import loadingCircle from 'animation/loading-circle.json'
import AssetInput from 'components/AssetInput'
import Button from 'components/Button'
import Dots from 'components/Dots'
import Typography from 'components/Typography'
import { classNames } from 'functions'
import { useBentoBoxContract, useTridentRouterContract } from 'hooks'
import useDesktopMediaQuery from 'hooks/useDesktopMediaQuery'
import Lottie from 'lottie-react'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { attemptingTxnAtom, showReviewAtom, spendFromWalletSelector } from '../../context/atoms'
import useCurrenciesFromURL from '../../context/hooks/useCurrenciesFromURL'
import { TypedField, useDependentAssetInputs } from '../../context/hooks/useDependentAssetInputs'
import TridentApproveGate from '../../TridentApproveGate'
import TransactionDetails from './../TransactionDetails'

const ClassicStandardMode = () => {
  const isDesktop = useDesktopMediaQuery()
  const { i18n } = useLingui()
  const bentoBox = useBentoBoxContract()
  const router = useTridentRouterContract()
  const {
    mainInput: [, setMainInput],
    secondaryInput: [, setSecondaryInput],
    formattedAmounts,
    parsedAmounts: [parsedAmountA, parsedAmountB],
    typedField: [, setTypedField],
    onMax,
    isMax,
    error,
  } = useDependentAssetInputs()
  const { currencies, setURLCurrency } = useCurrenciesFromURL()

  const setShowReview = useSetRecoilState(showReviewAtom)
  const [spendFromWalletA, setSpendFromWalletA] = useRecoilState(spendFromWalletSelector(0))
  const [spendFromWalletB, setSpendFromWalletB] = useRecoilState(spendFromWalletSelector(1))
  const attemptingTxn = useRecoilValue(attemptingTxnAtom)

  return (
    <>
      <div className="flex flex-col gap-6">
        <div />
        <div className="flex flex-col gap-4">
          <AssetInput
            value={formattedAmounts[0]}
            currency={currencies?.[0]}
            onChange={(val) => {
              setTypedField(TypedField.A)
              setMainInput(val || '')
            }}
            onSelect={(cur) => setURLCurrency(cur, 0)}
            headerRight={
              <AssetInput.WalletSwitch
                onChange={() => setSpendFromWalletA(!spendFromWalletA)}
                checked={spendFromWalletA}
                id="switch-spend-from-wallet-a"
              />
            }
            spendFromWallet={spendFromWalletA}
          />
          <div />
          <AssetInput
            value={formattedAmounts[1]}
            currency={currencies?.[1]}
            onChange={(val) => {
              setTypedField(TypedField.B)
              setSecondaryInput(val || '')
            }}
            onSelect={(cur) => setURLCurrency(cur, 1)}
            headerRight={
              <AssetInput.WalletSwitch
                onChange={() => setSpendFromWalletB(!spendFromWalletB)}
                checked={spendFromWalletB}
                id="switch-spend-from-wallet-b"
              />
            }
            spendFromWallet={spendFromWalletB}
          />
          <div className="flex flex-col gap-3">
            <TridentApproveGate
              inputAmounts={[parsedAmountA, parsedAmountB]}
              tokenApproveOn={bentoBox?.address}
              masterContractAddress={router?.address}
              withPermit={true}
            >
              {({ approved, loading }) => {
                const disabled = !!error || !approved || loading || attemptingTxn
                const buttonText = attemptingTxn ? (
                  <Dots>{i18n._(t`Depositing`)}</Dots>
                ) : loading ? (
                  ''
                ) : error ? (
                  error
                ) : (
                  i18n._(t`Confirm Deposit`)
                )

                return (
                  <div className={classNames(!isMax ? 'grid grid-cols-2 gap-3' : 'flex')}>
                    {!isMax && (
                      <Button color="gradient" variant={isMax ? 'filled' : 'outlined'} disabled={isMax} onClick={onMax}>
                        <Typography
                          variant="sm"
                          weight={700}
                          className={!isMax ? 'text-high-emphesis' : 'text-low-emphasis'}
                        >
                          {i18n._(t`Max Deposit`)}
                        </Typography>
                      </Button>
                    )}
                    <Button
                      {...(loading && {
                        startIcon: (
                          <div className="w-4 h-4 mr-1">
                            <Lottie animationData={loadingCircle} autoplay loop />
                          </div>
                        ),
                      })}
                      color="gradient"
                      disabled={disabled}
                      onClick={() => setShowReview(true)}
                    >
                      <Typography
                        id={`btn-${buttonText.toString().replace(/\s/g, '')}`}
                        variant="sm"
                        weight={700}
                        className={!error ? 'text-high-emphesis' : 'text-low-emphasis'}
                      >
                        {buttonText}
                      </Typography>
                    </Button>
                  </div>
                )
              }}
            </TridentApproveGate>
          </div>
        </div>
        {!error && !isDesktop && (
          <div className="flex flex-col">
            <TransactionDetails />
          </div>
        )}
      </div>
    </>
  )
}

export default ClassicStandardMode
