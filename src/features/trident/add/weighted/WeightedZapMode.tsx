import Alert from '../../../../components/Alert'
import { t } from '@lingui/macro'
import Button from '../../../../components/Button'
import { useLingui } from '@lingui/react'
import Typography from '../../../../components/Typography'
import ListPanel from '../../../../components/ListPanel'
import AssetInput from '../../../../components/AssetInput'
import { Token } from '@sushiswap/sdk'
import TransactionDetails from './../TransactionDetails'
import React from 'react'
import { useTridentAddContext, useTridentAddState } from '../../context'
import { WeightedPoolContext, WeightedPoolState } from './context/types'

const WeightedZapMode = () => {
  const { i18n } = useLingui()
  const { inputAmounts, inputTokenAddress } = useTridentAddState<WeightedPoolState>()
  const { pool, tokens, handleInput, showReview, parsedOutputAmounts, selectInputToken } =
    useTridentAddContext<WeightedPoolContext>()

  const validInput = inputTokenAddress && inputAmounts[inputTokenAddress]

  // TODO Fixture
  const weights = {
    [pool.tokens[0].address]: '70%',
    [pool.tokens[1].address]: '30%',
  }

  return (
    <>
      <div className="px-5">
        <Alert
          dismissable={false}
          type="information"
          showIcon
          message={i18n._(t`In Zap mode, your selected asset will be split and rebalanced into the corresponding tokens and their weights
          automatically.`)}
        />
      </div>
      <div className="flex flex-col gap-4 px-5">
        <AssetInput
          value={inputAmounts[inputTokenAddress]}
          currency={tokens[inputTokenAddress]}
          onChange={(value) => handleInput(value, inputTokenAddress, { clear: true })}
          onSelect={(token: Token) => selectInputToken(token.address)}
        />
        <Button
          color={inputAmounts[inputTokenAddress] ? 'gradient' : 'gray'}
          disabled={!validInput}
          className="font-bold text-sm"
          onClick={() => showReview(true)}
        >
          {inputAmounts[inputTokenAddress] ? i18n._(t`Confirm Deposit`) : i18n._(t`Select token & enter amount`)}
        </Button>
      </div>
      <div className="flex flex-col gap-4 px-5 mt-8">
        <Typography weight={700} className="text-high-emphesis">
          {inputTokenAddress
            ? i18n._(t`Your ${tokens[inputTokenAddress].symbol} will be split into:`)
            : i18n._(t`Your selected token will be split into:`)}
        </Typography>
        <ListPanel
          items={Object.values(parsedOutputAmounts).map((amount, index) => (
            <ListPanel.CurrencyAmountItem amount={amount} key={index} weight={weights[amount?.currency.address]} />
          ))}
        />
      </div>
      {validInput && (
        <div className="mt-6 px-5">
          <TransactionDetails />
        </div>
      )}
    </>
  )
}

export default WeightedZapMode
