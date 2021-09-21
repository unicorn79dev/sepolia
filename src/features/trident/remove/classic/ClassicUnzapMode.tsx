import React, { FC } from 'react'
import Typography from '../../../../components/Typography'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import ListPanel from '../../../../components/ListPanel'
import PercentInput from '../../../../components/Input/Percent'
import Button from '../../../../components/Button'
import ToggleButtonGroup from '../../../../components/ToggleButton'
import AssetSelect from '../../../../components/AssetSelect'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  attemptingTxnAtom,
  currentLiquidityValueSelector,
  outputToWalletAtom,
  poolAtom,
  poolBalanceAtom,
  showReviewAtom,
} from '../../context/atoms'
import { Percent } from '@sushiswap/core-sdk'
import Dots from '../../../../components/Dots'
import Lottie from 'lottie-react'
import loadingCircle from '../../../../animation/loading-circle.json'
import TridentApproveGate from '../../TridentApproveGate'
import { useTridentRouterContract } from '../../../../hooks'
import AssetInput from '../../../../components/AssetInput'
import useZapPercentageInput from '../../context/hooks/useZapPercentageInput'
import SumUSDCValues from '../../SumUSDCValues'

const ClassicUnzapMode: FC = () => {
  const { i18n } = useLingui()
  const router = useTridentRouterContract()
  const [, pool] = useRecoilValue(poolAtom)

  const {
    percentageInput: [percentageInput, setPercentageInput],
    parsedOutputAmount,
    zapCurrency: [zapCurrency, setZapCurrency],
    error,
  } = useZapPercentageInput()

  const currentLiquidityValue = useRecoilValue(currentLiquidityValueSelector)
  const setShowReview = useSetRecoilState(showReviewAtom)
  const attemptingTxn = useRecoilValue(attemptingTxnAtom)
  const poolBalance = useRecoilValue(poolBalanceAtom)
  const [outputToWallet, setOutputToWallet] = useRecoilState(outputToWalletAtom)

  return (
    <div className="px-5 mt-5">
      <div className="flex flex-col gap-8">
        <AssetSelect value={zapCurrency} onSelect={setZapCurrency} currencies={[pool?.token0, pool?.token1]} />
        <div className="flex flex-col gap-3">
          <Typography variant="h3" weight={700} className="text-high-emphesis">
            Amount to Remove:
          </Typography>
          <ListPanel
            header={<ListPanel.Header title={i18n._(t`Balances`)} value="$16,720.00" subValue="54.32134 SLP" />}
            items={[
              currentLiquidityValue.map((amount, index) => (
                <ListPanel.CurrencyAmountItem amount={amount} key={index} />
              )),
            ]}
            footer={
              <SumUSDCValues amounts={currentLiquidityValue}>
                {({ amount }) => (
                  <div className="flex justify-between items-center px-4 py-5 gap-3">
                    <PercentInput
                      value={percentageInput}
                      onUserInput={setPercentageInput}
                      placeholder="0%"
                      className="bg-transparent text-3xl leading-7 tracking-[-0.01em] flex-grow after:content-['%']"
                    />
                    <Typography variant="sm" className="text-low-emphesis">
                      ≈${amount?.greaterThan('0') ? amount?.toSignificant(6) : '0.0000'}
                    </Typography>
                  </div>
                )}
              </SumUSDCValues>
            }
          />
          <ToggleButtonGroup value={percentageInput} onChange={setPercentageInput} variant="outlined">
            <ToggleButtonGroup.Button value="100">Max</ToggleButtonGroup.Button>
            <ToggleButtonGroup.Button value="75">75%</ToggleButtonGroup.Button>
            <ToggleButtonGroup.Button value="50">50%</ToggleButtonGroup.Button>
            <ToggleButtonGroup.Button value="25">25%</ToggleButtonGroup.Button>
          </ToggleButtonGroup>
          <TridentApproveGate
            inputAmounts={[poolBalance?.multiply(new Percent(percentageInput, '100'))]}
            tokenApproveOn={router?.address}
          >
            {({ approved, loading }) => {
              const disabled = !!error || !approved || loading || attemptingTxn
              const buttonText = attemptingTxn ? (
                <Dots>{i18n._(t`Withdrawing`)}</Dots>
              ) : loading ? (
                ''
              ) : error ? (
                error
              ) : (
                i18n._(t`Confirm Withdrawal`)
              )

              return (
                <Button
                  {...(loading && {
                    startIcon: (
                      <div className="w-4 h-4 mr-1">
                        <Lottie animationData={loadingCircle} autoplay loop />
                      </div>
                    ),
                  })}
                  color={approved ? 'gradient' : 'blue'}
                  disabled={disabled}
                  onClick={() => setShowReview(true)}
                >
                  <Typography variant="sm" weight={700} className={!error ? 'text-high-emphesis' : 'text-low-emphasis'}>
                    {buttonText}
                  </Typography>
                </Button>
              )
            }}
          </TridentApproveGate>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between gap-3">
            <Typography variant="h3" weight={700} className="text-high-emphesis">
              {i18n._(t`Receive:`)}
            </Typography>
            <AssetInput.WalletSwitch onChange={() => setOutputToWallet(!outputToWallet)} checked={outputToWallet} />
          </div>
          {/*TODO ramin: */}
          <div className="flex flex-col gap-4">
            <ListPanel items={[<ListPanel.CurrencyAmountItem amount={parsedOutputAmount} key={0} />]} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClassicUnzapMode
