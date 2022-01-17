import { Switch } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Typography from 'app/components/Typography'
import { AppDispatch } from 'app/state'
import { setFromBentoBalance } from 'app/state/limit-order/actions'
import { useLimitOrderState } from 'app/state/limit-order/hooks'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'

const PayFromToggle: FC = () => {
  const { i18n } = useLingui()
  const { fromBentoBalance } = useLimitOrderState()
  const dispatch = useDispatch<AppDispatch>()

  const handleChange = (checked: boolean) => {
    dispatch(setFromBentoBalance(!checked))
  }

  return (
    <div className="px-5 py-2 pt-0 flex gap-2">
      <Typography variant="sm" weight={700}>
        {i18n._(t`Pay from:`)}
      </Typography>
      <Switch.Group>
        <div className="flex items-center">
          <Switch.Label className="mr-2">
            <Typography variant="sm" className={fromBentoBalance ? 'text-primary' : 'text-secondary'}>
              BentoBox
            </Typography>
          </Switch.Label>
          <Switch
            checked={!fromBentoBalance}
            onChange={handleChange}
            className="bg-gray-600 relative inline-flex items-center h-3 rounded-full w-9 transition-colors"
          >
            <span
              className={`${
                !fromBentoBalance ? 'translate-x-5' : ''
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
          <Switch.Label className="ml-2">
            <Typography variant="sm" className={!fromBentoBalance ? 'text-primary' : 'text-low-emphesis'}>
              {i18n._(t`Wallet`)}
            </Typography>
          </Switch.Label>
        </div>
      </Switch.Group>
    </div>
  )
}

export default PayFromToggle
