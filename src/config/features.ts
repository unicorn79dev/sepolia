import { ChainId } from '@sushiswap/core-sdk'
import { Feature } from 'app/enums'

type FeatureMap = { readonly [chainId in ChainId]?: Feature[] }

const features: FeatureMap = {
  [ChainId.ETHEREUM]: [
    Feature.AMM,
    Feature.LIQUIDITY_MINING,
    Feature.BENTOBOX,
    Feature.KASHI,
    Feature.MIGRATE,
    Feature.ANALYTICS,
    Feature.STAKING,
    Feature.MISO,
  ],
  [ChainId.ROPSTEN]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.BENTOBOX, Feature.KASHI, Feature.MISO],
  [ChainId.RINKEBY]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.BENTOBOX, Feature.KASHI, Feature.MISO],
  [ChainId.GÖRLI]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.BENTOBOX, Feature.KASHI, Feature.MISO],
  [ChainId.KOVAN]: [
    Feature.AMM,
    Feature.LIQUIDITY_MINING,
    Feature.BENTOBOX,
    Feature.KASHI,
    Feature.MISO,
    Feature.TRIDENT,
  ],
  [ChainId.BSC]: [Feature.AMM, Feature.BENTOBOX, Feature.KASHI, Feature.MIGRATE, Feature.ANALYTICS],
  [ChainId.BSC_TESTNET]: [Feature.AMM],
  [ChainId.FANTOM]: [Feature.AMM, Feature.ANALYTICS],
  [ChainId.FANTOM_TESTNET]: [Feature.AMM],
  [ChainId.MATIC]: [
    Feature.AMM,
    Feature.LIQUIDITY_MINING,
    Feature.BENTOBOX,
    Feature.KASHI,
    Feature.MIGRATE,
    Feature.ANALYTICS,
  ],
  [ChainId.MATIC_TESTNET]: [Feature.AMM],
  [ChainId.HARMONY]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS],
  [ChainId.HARMONY_TESTNET]: [Feature.AMM],
  [ChainId.AVALANCHE]: [Feature.AMM, Feature.BENTOBOX, Feature.KASHI],
  [ChainId.AVALANCHE_TESTNET]: [Feature.AMM],
  [ChainId.OKEX]: [Feature.AMM],
  [ChainId.OKEX_TESTNET]: [Feature.AMM],
  [ChainId.XDAI]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS, Feature.BENTOBOX, Feature.KASHI],
  [ChainId.MOONRIVER]: [Feature.AMM],
  [ChainId.ARBITRUM]: [Feature.AMM, Feature.LIQUIDITY_MINING, Feature.ANALYTICS, Feature.BENTOBOX, Feature.KASHI],
}

export default features
