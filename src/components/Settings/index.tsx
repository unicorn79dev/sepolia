import { CheckIcon, CogIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Percent } from '@sushiswap/core-sdk'
import Button from 'app/components/Button'
import CloseIcon from 'app/components/CloseIcon'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import Popover from 'app/components/Popover'
import QuestionHelper from 'app/components/QuestionHelper'
import Switch from 'app/components/Switch'
import TransactionSettings from 'app/components/TransactionSettings'
import Typography from 'app/components/Typography'
import { useToggleSettingsMenu } from 'app/state/application/hooks'
import { useExpertModeManager, useUserSingleHopOnly } from 'app/state/user/hooks'
import React, { FC, useState } from 'react'

interface SettingsTabProps {
  placeholderSlippage?: Percent
  trident?: boolean
}

const SettingsTab: FC<SettingsTabProps> = ({ placeholderSlippage, trident = false }) => {
  const { i18n } = useLingui()

  const toggle = useToggleSettingsMenu()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    <>
      <Popover
        placement="bottom-end"
        content={
          <div className="p-3 flex flex-col bg-dark-900 gap-3 rounded w-80 shadow-xl border border-dark-700">
            <div className="flex flex-col gap-4 p-3 border border-dark-800/60 rounded">
              <Typography variant="xxs" weight={700} className="text-secondary">
                {i18n._(t`Transaction Settings`)}
              </Typography>
              <TransactionSettings placeholderSlippage={placeholderSlippage} trident={trident} />
            </div>
            <div className="flex flex-col gap-3 p-3 border border-dark-800/60 rounded">
              <Typography variant="xxs" weight={700} className="text-secondary">
                {i18n._(t`Interface Settings`)}
              </Typography>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Typography variant="xs" className="text-high-emphesis" weight={700}>
                    {i18n._(t`Toggle expert mode`)}
                  </Typography>
                  <QuestionHelper
                    text={i18n._(
                      t`Bypasses confirmation modals and allows high slippage trades. Use at your own risk.`
                    )}
                  />
                </div>
                <Switch
                  size="sm"
                  id="toggle-expert-mode-button"
                  checked={expertMode}
                  onChange={
                    expertMode
                      ? () => {
                          toggleExpertMode()
                          setShowConfirmation(false)
                        }
                      : () => {
                          toggle()
                          setShowConfirmation(true)
                        }
                  }
                  checkedIcon={<CheckIcon className="text-dark-700" />}
                  uncheckedIcon={<CloseIcon />}
                  color="gradient"
                />
              </div>
              {!trident && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Typography variant="xs" className="text-high-emphesis" weight={700}>
                      {i18n._(t`Disable multihops`)}
                    </Typography>
                    <QuestionHelper text={i18n._(t`Restricts swaps to direct pairs only.`)} />
                  </div>
                  <Switch
                    size="sm"
                    id="toggle-disable-multihop-button"
                    checked={singleHopOnly}
                    onChange={() => (singleHopOnly ? setSingleHopOnly(false) : setSingleHopOnly(true))}
                    checkedIcon={<CheckIcon className="text-dark-700" />}
                    uncheckedIcon={<CloseIcon />}
                    color="gradient"
                  />
                </div>
              )}
            </div>
          </div>
        }
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer">
          <CogIcon className="w-[26px] h-[26px] transform rotate-90 hover:text-white" />
        </div>
      </Popover>
      <HeadlessUiModal.Controlled isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxWidth="md">
        <div className="flex flex-col gap-4">
          <HeadlessUiModal.Header header={i18n._(t`Confirm`)} onClose={() => setShowConfirmation(false)} />
          <HeadlessUiModal.BorderedContent className="flex flex-col gap-3 !border-yellow/40">
            <Typography variant="xs" weight={700} className="text-secondary">
              {i18n._(t`Only use this mode if you know what you are doing.`)}
            </Typography>
            <Typography variant="sm" weight={700} className="text-yellow">
              {i18n._(t`Expert mode turns off the confirm transaction prompt and allows high slippage trades
                                that often result in bad rates and lost funds.`)}
            </Typography>
          </HeadlessUiModal.BorderedContent>
          <Button
            color="blue"
            variant="filled"
            onClick={() => {
              toggleExpertMode()
              setShowConfirmation(false)
            }}
          >
            {i18n._(t`Enable Expert Mode`)}
          </Button>
        </div>
      </HeadlessUiModal.Controlled>
    </>
  )
}

export default SettingsTab
