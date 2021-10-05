import { ChipColor } from '../../components/Chip'
import { PoolUnion, PoolAtomType, PoolType } from './types'
import { formatPercent } from '../../functions'

export const SORT_OPTIONS = [
  { title: 'APY Highest to Lowest', desc: true },
  { title: 'APY Lowest to Highest', desc: false },
  { title: 'TVL Highest to Lowest', desc: true },
  { title: 'TVL Lowest to Highest', desc: false },
]

type PoolTypesInterface = Record<
  PoolType,
  {
    label: string
    label_long: string
    color: ChipColor
    description: string
    long_description: string
    image: { url: string; width: number; height: number }
  }
>

export const POOL_TYPES: PoolTypesInterface = {
  [PoolType.ConstantProduct]: {
    label: 'Classic',
    label_long: 'Classic Pool',
    color: 'default',
    description: 'Most common, traditional 50/50 value split between assets',
    long_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim bibendum in ut amet, sit fames. Iaculis ultrices sit fermentum commodo nisl eget etiam fusce ac. Risus enim sollicitudin phasellus nibh. Neque turpis amet at scelerisque vitae nibh magna. Aliquet ut natoque quisque eget pellentesque id. Convallis enim.',
    image: {
      url: '/images/trident/a-b-pool.png',
      width: 121,
      height: 95,
    },
  },
  [PoolType.Weighted]: {
    label: 'Weighted',
    label_long: 'Weighted Pool',
    color: 'yellow',
    description: 'Two asset pools, with the value split skewed higher towards one.',
    long_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim bibendum in ut amet, sit fames. Iaculis ultrices sit fermentum commodo nisl eget etiam fusce ac. Risus enim sollicitudin phasellus nibh. Neque turpis amet at scelerisque vitae nibh magna. Aliquet ut natoque quisque eget pellentesque id. Convallis enim.',
    image: {
      url: '/images/trident/weighted-pool-scale.png',
      width: 151,
      height: 95,
    },
  },
  [PoolType.ConcentratedLiquidity]: {
    label: 'Concentrated',
    label_long: 'Concentrated Range',
    color: 'purple',
    description: 'Same value makeup of a classic pool, but for a specific price range',
    long_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim bibendum in ut amet, sit fames. Iaculis ultrices sit fermentum commodo nisl eget etiam fusce ac. Risus enim sollicitudin phasellus nibh. Neque turpis amet at scelerisque vitae nibh magna. Aliquet ut natoque quisque eget pellentesque id. Convallis enim.',
    image: {
      url: '/images/trident/a-b-pool.png',
      width: 151,
      height: 95,
    },
  },
  [PoolType.Hybrid]: {
    label: 'Hybrid',
    label_long: 'Hybrid Pool',
    color: 'blue',
    description: '3 to 32 assets, with tokens deposited in equal values',
    long_description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dignissim bibendum in ut amet, sit fames. Iaculis ultrices sit fermentum commodo nisl eget etiam fusce ac. Risus enim sollicitudin phasellus nibh. Neque turpis amet at scelerisque vitae nibh magna. Aliquet ut natoque quisque eget pellentesque id. Convallis enim.',
    image: {
      url: '/images/trident/a-b-pool.png',
      width: 121,
      height: 95,
    },
  },
}

export interface FeeFilterType {
  label: string
  color: ChipColor
}

export const FEE_TIERS: FeeFilterType[] = [
  { label: '1%', color: 'blue' },
  { label: '0.5%', color: 'blue' },
  { label: '0.1%', color: 'blue' },
  { label: '0.05%', color: 'blue' },
]
