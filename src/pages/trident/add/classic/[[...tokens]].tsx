import { ChevronLeftIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { PoolType } from '@sushiswap/tines'
import Alert from 'app/components/Alert'
import Button from 'app/components/Button'
import Typography from 'app/components/Typography'
import ClassicStandardAside from 'app/features/trident/add/classic/ClassicStandardAside'
import ClassicStandardMode from 'app/features/trident/add/classic/ClassicStandardMode'
import ClassicZapAside from 'app/features/trident/add/classic/ClassicZapAside'
import ClassicZapMode from 'app/features/trident/add/classic/ClassicZapMode'
import TransactionReviewStandardModal from 'app/features/trident/add/classic/TransactionReviewStandardModal'
import TransactionReviewZapModal from 'app/features/trident/add/classic/TransactionReviewZapModal'
import FixedRatioHeader from 'app/features/trident/add/FixedRatioHeader'
import { BREADCRUMBS } from 'app/features/trident/Breadcrumb'
import { TRIDENT_NETWORKS } from 'app/features/trident/constants'
import { liquidityModeAtom, poolAtom } from 'app/features/trident/context/atoms'
import useCurrenciesFromURL from 'app/features/trident/context/hooks/useCurrenciesFromURL'
import DepositSubmittedModal from 'app/features/trident/DepositSubmittedModal'
import TridentRecoilRoot from 'app/features/trident/TridentRecoilRoot'
import { LiquidityMode } from 'app/features/trident/types'
import NetworkGuard from 'app/guards/Network'
import { ConstantProductPoolState, useTridentClassicPool } from 'app/hooks/useTridentClassicPools'
import TridentLayout, { TridentBody, TridentHeader } from 'app/layouts/Trident'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilValue } from 'recoil'

const AddClassic = () => {
  const { i18n } = useLingui()
  const { query } = useRouter()
  const { currencies, twap, fee } = useCurrenciesFromURL()
  const liquidityMode = useRecoilValue(liquidityModeAtom)
  const [, pool] = useRecoilValue(poolAtom)
  const classicPool = useTridentClassicPool(currencies[0], currencies[1], fee, twap)

  return (
    <>
      <TridentHeader pattern="bg-bubble-pattern">
        <div className="relative flex flex-col w-full gap-5 mt-px lg:justify-between lg:w-7/12">
          <div>
            <Button
              color="blue"
              variant="outlined"
              size="sm"
              className="!pl-2 !py-1 rounded-full"
              startIcon={<ChevronLeftIcon width={24} height={24} />}
            >
              <Link
                href={
                  query.tokens[0] && query.tokens[1]
                    ? `/trident/pool/classic/${query.tokens[0]}/${query.tokens[1]}`
                    : '/trident/pools'
                }
              >
                {pool ? `${currencies?.[0]?.symbol}-${currencies?.[1]?.symbol}` : i18n._(t`Back`)}
              </Link>
            </Button>
          </div>
          <div>
            <Typography variant="h2" weight={700} className="text-high-emphesis">
              {i18n._(t`Add Liquidity`)}
            </Typography>
            <Typography variant="sm">
              {i18n._(
                t`Deposit any or all pool tokens directly with Standard mode,  or invest with any asset in Zap mode.`
              )}
            </Typography>
          </div>
        </div>
      </TridentHeader>

      <TridentBody>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full lg:w-7/12">
            <FixedRatioHeader />
            {[ConstantProductPoolState.NOT_EXISTS, ConstantProductPoolState.INVALID].includes(classicPool[0]) && (
              <Alert
                dismissable={false}
                type="error"
                showIcon
                message={i18n._(t`A Pool could not be found for provided currencies`)}
              />
            )}
            <>
              {liquidityMode === LiquidityMode.ZAP && (
                <>
                  <ClassicZapMode />
                  <TransactionReviewZapModal />
                </>
              )}
              {liquidityMode === LiquidityMode.STANDARD && (
                <>
                  <ClassicStandardMode />
                  <TransactionReviewStandardModal />
                </>
              )}
              <DepositSubmittedModal />
            </>
          </div>
          <div className="flex flex-col hidden lg:block lg:w-4/12 -mt-40">
            {liquidityMode === LiquidityMode.STANDARD ? <ClassicStandardAside /> : <ClassicZapAside />}
          </div>
        </div>
      </TridentBody>
    </>
  )
}

AddClassic.Guard = NetworkGuard(TRIDENT_NETWORKS)
AddClassic.Provider = (props) => <TridentRecoilRoot poolType={PoolType.ConstantProduct} {...props} />
AddClassic.Layout = (props) => (
  <TridentLayout
    {...props}
    breadcrumbs={[BREADCRUMBS['pools'], BREADCRUMBS['pool_classic'], BREADCRUMBS['add_classic']]}
  />
)

export default AddClassic
