import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Form from 'app/components/Form'
import FormFieldHelperText from 'app/components/Form/FormFieldHelperText'
import ToggleButtonGroup from 'app/components/ToggleButton'
import Typography from 'app/components/Typography'
import { AuctionCreationWizardInput } from 'app/features/miso/AuctionCreationWizard/index'
import { formatNumber } from 'app/functions'
import { useCurrency } from 'app/hooks/Tokens'
import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form'

const LiquidityLauncherStep: FC = () => {
  const { i18n } = useLingui()
  const { getValues, setValue, watch } = useFormContext<AuctionCreationWizardInput>()
  const [paymentCurrencyAddress, liqTokenAmount, tokenSymbol, liqPercentage] = watch([
    'paymentCurrencyAddress',
    'liqTokenAmount',
    'tokenSymbol',
    'liqPercentage',
  ])
  const paymentToken = useCurrency(paymentCurrencyAddress)

  return (
    <>
      <div className="col-span-4">
        <Typography weight={700}>{i18n._(t`Liquidity lockup time`)}</Typography>
        <ToggleButtonGroup
          variant="outlined"
          value={getValues('liqLockTime')}
          onChange={(val) => setValue('liqLockTime', Number(val), { shouldValidate: true })}
          className="mt-2 !flex"
        >
          <ToggleButtonGroup.Button value={180} activeClassName="border-purple" className="!bg-none px-5 !py-2.5">
            {i18n._(t`${180} days`)}
          </ToggleButtonGroup.Button>
          <ToggleButtonGroup.Button value={90} activeClassName="border-purple" className="!bg-none px-5 !py-2.5">
            {i18n._(t`${90} days`)}
          </ToggleButtonGroup.Button>
        </ToggleButtonGroup>
        <Form.TextField
          name="liqLockTime"
          helperText={i18n._(t`Custom amount of days`)}
          placeholder=""
          endIcon={
            <Typography variant="sm" weight={700} className="text-secondary">
              {i18n._(t`Days`)}
            </Typography>
          }
        />
      </div>
      <div className="col-span-4">
        <Form.TextField
          name="liqTokenAmount"
          label={i18n._(t`Tokens for liquidity seeding*`)}
          helperText={i18n._(
            t`The token amount reserved for liquidity seeding added to the tokens for sale has to be less than the total supply of the token`
          )}
          placeholder="Enter the amount of tokens you would like to use for liquidity."
        />
      </div>
      <div className="col-span-4">
        <Form.TextField
          endIcon={
            <Typography variant="sm" weight={700} className="text-secondary">
              %
            </Typography>
          }
          name="liqPercentage"
          label={i18n._(t`Auction proceeds percentage*`)}
          placeholder="50"
          helperText={i18n._(t`Percentage of auction proceeds used for liquidity seeding.`)}
        />
      </div>

      <div className="col-span-4">
        <Typography weight={700}>{i18n._(t`Liquidity Pair`)}</Typography>
        {liqTokenAmount && liqPercentage && (
          <Typography className="mt-2">
            {formatNumber((Number(liqTokenAmount) * Number(liqPercentage)) / 100)} {tokenSymbol} +{' '}
            {Number(liqPercentage)}% of auction {paymentToken?.symbol} proceeds
          </Typography>
        )}
        <FormFieldHelperText>
          {i18n._(
            t`Liquidity pair token is set to the payment currency from your auction + the token that is set for auction`
          )}
        </FormFieldHelperText>
      </div>
    </>
  )
}

export default LiquidityLauncherStep
