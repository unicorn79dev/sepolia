import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Fee } from '@sushiswap/trident-sdk'
import Typography from 'app/components/Typography'
import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { selectedFeeTierAtom } from '../context/atoms'
import { FeeTierSelect } from './FeeTierSelect'

export const SelectFeeTier: FC = () => {
  const { i18n } = useLingui()
  const [selectedFeeTier, setSelectedFeeTier] = useRecoilState(selectedFeeTierAtom)

  return (
    <div>
      <Typography variant="h3" weight={700} className="text-high-emphesis">
        Select Fee Tier
      </Typography>
      <div className="mt-2 text-secondary">
        Select the percentage of fee that this pool will take from a swap order. Higher fee tiers suit pairs with more
        volatility and less volume.
      </div>
      <div className="grid gap-3 mt-4 select-none lg:grid-cols-4 md:grid-cols-2">
        <FeeTierSelect
          tier={Fee.LOW}
          subtitle={i18n._(t`Best for stable pairs`)}
          selectedFeeTier={selectedFeeTier}
          setter={setSelectedFeeTier}
        />
        <FeeTierSelect
          tier={Fee.MEDIUM}
          subtitle={i18n._(t`Best for mainstream pairs`)}
          selectedFeeTier={selectedFeeTier}
          setter={setSelectedFeeTier}
        />
        <FeeTierSelect
          tier={Fee.DEFAULT}
          subtitle={i18n._(t`Best for volatile pairs`)}
          selectedFeeTier={selectedFeeTier}
          setter={setSelectedFeeTier}
        />
        <FeeTierSelect
          tier={Fee.HIGH}
          subtitle={i18n._(t`Best for exotic pairs`)}
          selectedFeeTier={selectedFeeTier}
          setter={setSelectedFeeTier}
        />
      </div>
    </div>
  )
}
