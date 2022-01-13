import { Signature } from '@ethersproject/bytes'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Currency, CurrencyAmount, ZERO } from '@sushiswap/core-sdk'
import Button, { ButtonDotted } from 'app/components/Button'
import { ApprovalState, useApproveCallback } from 'app/hooks/useApproveCallback'
import useBentoMasterApproveCallback, { BentoApprovalState, BentoPermit } from 'app/hooks/useBentoMasterApproveCallback'
import { StandardSignatureData, useTridentLiquidityTokenPermit } from 'app/hooks/useERC20Permit'
import { useActiveWeb3React } from 'app/services/web3'
import { useWalletModalToggle } from 'app/state/application/hooks'
import React, { FC, memo, ReactNode, useCallback, useEffect, useState } from 'react'
import { atom, RecoilState, useSetRecoilState } from 'recoil'

export const TridentApproveGateBentoPermitAtom = atom<Signature | undefined>({
  key: 'TridentApproveGate:BentoPermit',
  default: undefined,
})

export const TridentApproveGateSLPPermitAtom = atom<StandardSignatureData | undefined>({
  key: 'TridentApproveGate:SLPPermit',
  default: undefined,
})

interface TokenApproveButtonProps {
  inputAmount: CurrencyAmount<Currency> | undefined
  onStateChange: React.Dispatch<React.SetStateAction<any>>
  tokenApproveOn: string | undefined
  id: string
}

const TokenApproveButton: FC<TokenApproveButtonProps> = memo(({ inputAmount, onStateChange, tokenApproveOn, id }) => {
  const { i18n } = useLingui()
  const [approveState, approveCallback] = useApproveCallback(inputAmount?.wrapped, tokenApproveOn)
  const setSLPPermit = useSetRecoilState(TridentApproveGateSLPPermitAtom)
  const { gatherPermitSignature, signatureData } = useTridentLiquidityTokenPermit(
    inputAmount?.currency.name === 'Sushi LP Token' ? inputAmount?.wrapped : undefined,
    tokenApproveOn
  )

  // Try to approve using permit, use normal approve otherwise
  const handleApprove = useCallback(async () => {
    if (gatherPermitSignature) {
      try {
        await gatherPermitSignature()
      } catch (e) {
        await approveCallback()
      }
    } else {
      await approveCallback()
    }
  }, [approveCallback, gatherPermitSignature])

  // If we have signatureData, sync to recoil
  useEffect(() => {
    if (signatureData && inputAmount && approveState === ApprovalState.NOT_APPROVED) {
      // Can safely cast because signatureData is always StandardSignatureData if PermitType === PermitType.amount
      setSLPPermit(signatureData as StandardSignatureData)
    }
  }, [approveState, inputAmount, onStateChange, setSLPPermit, signatureData])

  useEffect(() => {
    if (!inputAmount?.currency.wrapped.address) return

    onStateChange((prevState) => ({
      ...prevState,
      [inputAmount.currency.wrapped.address]: signatureData ? ApprovalState.APPROVED : approveState,
    }))

    return () =>
      onStateChange((prevState) => {
        const state = { ...prevState }
        if (state[inputAmount!!.currency.wrapped.address]) {
          delete state[inputAmount!!.currency.wrapped.address]
        }

        return state
      })
  }, [approveState, inputAmount, inputAmount?.currency.wrapped.address, onStateChange, signatureData])

  if (!signatureData && [ApprovalState.NOT_APPROVED, ApprovalState.PENDING].includes(approveState)) {
    return (
      <ButtonDotted id={id} pending={approveState === ApprovalState.PENDING} color="blue" onClick={handleApprove}>
        {approveState === ApprovalState.PENDING
          ? i18n._(t`Approving ${inputAmount?.currency.symbol}`)
          : i18n._(t`Approve ${inputAmount?.currency.symbol}`)}
      </ButtonDotted>
    )
  }

  return <></>
})

type TridentApproveGate<P> = FC<P> & {
  bentoPermit: RecoilState<Signature | undefined>
  slpPermit: RecoilState<StandardSignatureData | undefined>
}

interface TridentApproveGateProps {
  inputAmounts: (CurrencyAmount<Currency> | undefined)[]
  children: ({ approved, loading }: { approved: boolean; loading: boolean; permit?: BentoPermit }) => ReactNode
  tokenApproveOn?: string
  withPermit?: boolean
  masterContractAddress?: string
}

const TridentApproveGate: TridentApproveGate<TridentApproveGateProps> = ({
  inputAmounts,
  tokenApproveOn,
  children,
  withPermit = false,
  masterContractAddress,
}) => {
  const { account } = useActiveWeb3React()
  const { i18n } = useLingui()
  const [status, setStatus] = useState<Record<string, ApprovalState>>({})
  const toggleWalletModal = useWalletModalToggle()
  const setBentoPermit = useSetRecoilState(TridentApproveGateBentoPermitAtom)

  const {
    approve: bApproveCallback,
    approvalState: bApprove,
    getPermit,
    permit,
  } = useBentoMasterApproveCallback(masterContractAddress ? masterContractAddress : undefined, {})

  const loading =
    Object.values(status).some((el) => el === ApprovalState.UNKNOWN) ||
    (masterContractAddress ? bApprove === BentoApprovalState.UNKNOWN : false)

  const approved =
    Object.values(status).every((el) => el === ApprovalState.APPROVED) &&
    (masterContractAddress ? bApprove === BentoApprovalState.APPROVED : true)

  const onClick = useCallback(async () => {
    if (withPermit) {
      const permit = await getPermit()
      if (permit) {
        setBentoPermit(permit.signature)
      }
    } else {
      await bApproveCallback()
    }
  }, [bApproveCallback, getPermit, setBentoPermit, withPermit])

  return (
    <div className="flex flex-col gap-3">
      {/*hide bentobox approval if not every inputAmount is greater than than zero*/}
      {inputAmounts.every((el) => el?.greaterThan(ZERO)) &&
        [BentoApprovalState.NOT_APPROVED, BentoApprovalState.PENDING].includes(bApprove) && (
          <ButtonDotted
            id={`btn-approve`}
            pending={bApprove === BentoApprovalState.PENDING}
            color="blue"
            onClick={onClick}
          >
            {bApprove === BentoApprovalState.PENDING ? i18n._(t`Approving BentoBox`) : i18n._(t`Approve BentoBox`)}
          </ButtonDotted>
        )}
      {inputAmounts.reduce<ReactNode[]>((acc, amount, index) => {
        if (!amount?.currency.isNative && amount?.greaterThan(ZERO)) {
          acc.push(
            <TokenApproveButton
              id={`btn-approve`}
              inputAmount={amount}
              key={index}
              onStateChange={setStatus}
              tokenApproveOn={tokenApproveOn}
            />
          )
        }
        return acc
      }, [])}
      {!account ? (
        <Button color="gradient" onClick={toggleWalletModal}>
          {i18n._(t`Connect Wallet`)}
        </Button>
      ) : (
        children({ approved, loading, permit })
      )}
    </div>
  )
}

TridentApproveGate.bentoPermit = TridentApproveGateBentoPermitAtom
TridentApproveGate.slpPermit = TridentApproveGateSLPPermitAtom
export default TridentApproveGate
