import { yupResolver } from '@hookform/resolvers/yup'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { CHAIN_KEY } from '@sushiswap/core-sdk'
import MISO from '@sushiswap/miso/exports/all.json'
import Button from 'app/components/Button'
import Form from 'app/components/Form'
import TokenCreationFormGeneralDetails from 'app/features/miso/TokenCreationForm/TokenCreationFormGeneralDetails'
import TokenCreationFormTypeSelector from 'app/features/miso/TokenCreationForm/TokenCreationFormTypeSelector'
import TokenCreationReviewModal from 'app/features/miso/TokenCreationForm/TokenCreationReviewModal'
import { addressValidator } from 'app/functions/yupValidators'
import { useActiveWeb3React } from 'app/services/web3'
import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

export interface TokenCreationFormInput {
  tokenTypeAddress: string
  tokenName: string
  tokenSymbol: string
  tokenSupply: number
}

const schema = yup.object({
  tokenTypeAddress: addressValidator.required(),
  tokenName: yup.string().required(),
  tokenSymbol: yup.string().required(),
  tokenSupply: yup
    .number()
    .required()
    .min(1)
    .max(2e256 - 1),
})

const TokenCreationForm: FC = ({}) => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()
  const [open, setOpen] = useState<boolean>(false)

  const methods = useForm<TokenCreationFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      tokenTypeAddress: chainId ? MISO[chainId]?.[CHAIN_KEY[chainId]]?.contracts.FixedToken.address : undefined,
    },
    reValidateMode: 'onChange',
  })

  const {
    watch,
    formState: { errors },
  } = methods

  // Validate form on every input
  const data = watch()

  const onSubmit = () => setOpen(true)

  return (
    <>
      <Form {...methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Form.Card>
          <TokenCreationFormTypeSelector />
          <TokenCreationFormGeneralDetails />
          <Form.Submit>
            <div>
              <Button disabled={Object.keys(errors).length > 0} color="blue" type="submit">
                {i18n._(t`Review`)}
              </Button>
            </div>
          </Form.Submit>
        </Form.Card>
      </Form>
      <TokenCreationReviewModal open={open} onDismiss={() => setOpen(false)} data={data} />
    </>
  )
}

export default TokenCreationForm
