import { defaultAbiCoder } from '@ethersproject/abi'
import { AddressZero } from '@ethersproject/constants'
import { ChainId, CHAINLINK_ORACLE_ADDRESS } from '@sushiswap/core-sdk'
import { CHAINLINK_PRICE_FEED_MAP } from 'app/config/oracles/chainlink'
import { ChainlinkOracle } from 'app/entities/oracles'
import { IOracle } from 'app/interfaces'

import { e10 } from './math'

export function getOracle(chainId: ChainId, address: string, data: string): IOracle {
  if (address.toLowerCase() === CHAINLINK_ORACLE_ADDRESS[chainId].toLowerCase()) {
    return new ChainlinkOracle(chainId, address, data)
  }
}

export function validateChainlinkOracleData(chainId = ChainId.ETHEREUM, collateral, asset, data) {
  const mapping = CHAINLINK_PRICE_FEED_MAP[chainId]
  if (!mapping) {
    return false
  }
  const params = defaultAbiCoder.decode(['address', 'address', 'uint256'], data)
  let decimals = 54
  let from = ''
  let to = ''
  if (params[0] !== AddressZero) {
    if (!mapping![params[0]]) {
      // 'One of the Chainlink oracles used is not configured in this UI.'
      console.log('One of the Chainlink oracles used is not configured in this UI.')
      return false
    } else {
      decimals -= 18 - mapping![params[0]].decimals
      from = mapping![params[0]].from
      to = mapping![params[0]].to
    }
  }
  if (params[1] !== AddressZero) {
    if (!mapping![params[1]]) {
      // 'One of the Chainlink oracles used is not configured in this UI.'
      return false
    } else {
      decimals -= mapping![params[1]].decimals
      if (!to) {
        from = mapping![params[1]].to
        to = mapping![params[1]].from
      } else if (to === mapping![params[1]].to) {
        to = mapping![params[1]].from
      } else {
        // "The Chainlink oracles used don't match up with eachother. If 2 oracles are used, they should have a common token, such as WBTC/ETH and LINK/ETH, where ETH is the common link."
        console.log(
          "The Chainlink oracles used don't match up with eachother. If 2 oracles are used, they should have a common token, such as WBTC/ETH and LINK/ETH, where ETH is the common link."
        )
        return false
      }
    }
  }

  if (from === asset.address && to === collateral.address) {
    const needed = collateral.decimals + 18 - asset.decimals
    const divider = e10(decimals - needed)
    if (!divider.eq(params[2])) {
      // 'The divider parameter is misconfigured for this oracle, which leads to rates that are order(s) of magnitude wrong.'
      console.log(
        'The divider parameter is misconfigured for this oracle, which leads to rates that are order(s) of magnitude wrong.'
      )
      return false
    } else {
      return true
    }
  } else {
    // "The Chainlink oracles configured don't match the pair tokens."
    console.log("The Chainlink oracles configured don't match the pair tokens.")
    return false
  }
}
