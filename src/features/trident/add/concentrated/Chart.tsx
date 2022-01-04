import { Disclosure } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Typography from 'app/components/Typography'
import React, { FC } from 'react'
import { useRecoilValue } from 'recoil'

import { poolAtom } from '../../context/atoms'

const Chart: FC = () => {
  const { i18n } = useLingui()
  const { pool } = useRecoilValue(poolAtom)

  return (
    <Disclosure>
      {({ open }) => (
        <div className="flex flex-col">
          <div className="flex justify-between items-center bg-dark-800 border border-dark-700 p-5">
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-1 items-center">
                <div className="h-3 w-3 bg-green rounded-full" />
                <Typography variant="xs" weight={400} className="text-high-emphesis">
                  {i18n._(t`Current Price`)}
                </Typography>
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Typography weight={700} className="text-high-emphesis">
                  1 {pool?.token0.symbol}
                </Typography>
                <svg
                  className="text-secondary"
                  width="15"
                  height="10"
                  viewBox="0 0 15 10"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0008 3.57183C12.0008 3.38252 11.9218 3.20097 11.7811 3.06711C11.6404 2.93325 11.4496 2.85805 11.2507 2.85805H2.5566L4.28192 1.22349C4.42317 1.08908 4.50253 0.906783 4.50253 0.716702C4.50253 0.526621 4.42317 0.344325 4.28192 0.209917C4.14066 0.0755095 3.94908 1.41622e-09 3.74932 0C3.54956 -1.41622e-09 3.35798 0.0755095 3.21672 0.209917L0.216179 3.06504C0.112092 3.16542 0.0415819 3.29288 0.0135462 3.43135C-0.0144895 3.56981 0.00120539 3.71308 0.0586504 3.84307C0.114926 3.97342 0.210491 4.085 0.333304 4.16375C0.456116 4.24251 0.60068 4.28491 0.748776 4.28561H11.2507C11.4496 4.28561 11.6404 4.21041 11.7811 4.07655C11.9218 3.94269 12.0008 3.76113 12.0008 3.57183ZM14.9413 6.15572C14.8851 6.02537 14.7895 5.91378 14.6667 5.83503C14.5439 5.75628 14.3993 5.71388 14.2512 5.71317H3.74932C3.55037 5.71317 3.35957 5.78837 3.21889 5.92223C3.07822 6.05609 2.99918 6.23765 2.99918 6.42695C2.99918 6.61626 3.07822 6.79781 3.21889 6.93167C3.35957 7.06553 3.55037 7.14074 3.74932 7.14074H12.4434L10.7181 8.7753C10.6478 8.84165 10.592 8.9206 10.5539 9.00758C10.5158 9.09456 10.4962 9.18785 10.4962 9.28208C10.4962 9.37631 10.5158 9.4696 10.5539 9.55658C10.592 9.64356 10.6478 9.72251 10.7181 9.78886C10.7878 9.85577 10.8708 9.90887 10.9622 9.94511C11.0536 9.98134 11.1517 10 11.2507 10C11.3497 10 11.4478 9.98134 11.5392 9.94511C11.6306 9.90887 11.7135 9.85577 11.7833 9.78886L14.7838 6.93374C14.8879 6.83336 14.9584 6.7059 14.9865 6.56744C15.0145 6.42897 14.9988 6.2857 14.9413 6.15572Z"
                    fill="currentColor"
                  />
                </svg>
                <Typography weight={700} className="text-high-emphesis">
                  {pool?.token1?.symbol}
                </Typography>
              </div>
            </div>
            <Disclosure.Button className="flex flex-row justify-between">
              <div className="text-high-emphesis cursor-pointer">
                {open ? (
                  <XIcon fill="currentColor" width={31} height={26} />
                ) : (
                  <svg
                    width="31"
                    height="26"
                    viewBox="0 0 31 26"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="path-1-outside-1"
                      maskUnits="userSpaceOnUse"
                      x="0.875"
                      y="0"
                      width="31"
                      height="26"
                      fill="black"
                    >
                      <rect fill="white" x="0.875" width="31" height="26" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3.875 2C3.875 1.44772 3.42728 1 2.875 1C2.32272 1 1.875 1.44772 1.875 2V23.7651C1.875 24.3173 2.32272 24.7651 2.875 24.7651H28.9931C29.5453 24.7651 29.9931 24.3173 29.9931 23.7651C29.9931 23.2128 29.5453 22.7651 28.9931 22.7651H3.875V17.6898L11.6297 10.9044L19.6873 16.9475C20.0653 17.2311 20.5902 17.2113 20.9458 16.9001L29.6518 9.28236C30.0675 8.91867 30.1096 8.28691 29.7459 7.87127C29.3822 7.45564 28.7504 7.41352 28.3348 7.7772L20.2388 14.8612L12.1813 8.81803C11.8032 8.53452 11.2784 8.5543 10.9228 8.86546L3.875 15.0322V2Z"
                      />
                    </mask>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.875 2C3.875 1.44772 3.42728 1 2.875 1C2.32272 1 1.875 1.44772 1.875 2V23.7651C1.875 24.3173 2.32272 24.7651 2.875 24.7651H28.9931C29.5453 24.7651 29.9931 24.3173 29.9931 23.7651C29.9931 23.2128 29.5453 22.7651 28.9931 22.7651H3.875V17.6898L11.6297 10.9044L19.6873 16.9475C20.0653 17.2311 20.5902 17.2113 20.9458 16.9001L29.6518 9.28236C30.0675 8.91867 30.1096 8.28691 29.7459 7.87127C29.3822 7.45564 28.7504 7.41352 28.3348 7.7772L20.2388 14.8612L12.1813 8.81803C11.8032 8.53452 11.2784 8.5543 10.9228 8.86546L3.875 15.0322V2Z"
                      fill="currentColor"
                    />
                    <path
                      d="M3.875 22.7651H2.875C2.875 23.3173 3.32272 23.7651 3.875 23.7651V22.7651ZM3.875 17.6898L3.2165 16.9372C2.99948 17.1271 2.875 17.4014 2.875 17.6898H3.875ZM11.6297 10.9044L12.2297 10.1044C11.8517 9.82087 11.3268 9.84065 10.9712 10.1518L11.6297 10.9044ZM19.6873 16.9475L19.0873 17.7475L19.0873 17.7475L19.6873 16.9475ZM20.9458 16.9001L20.2873 16.1475V16.1475L20.9458 16.9001ZM29.6518 9.28236L30.3103 10.0349V10.0349L29.6518 9.28236ZM29.7459 7.87127L28.9933 8.52978L28.9933 8.52978L29.7459 7.87127ZM28.3348 7.7772L27.6763 7.02462L27.6763 7.02463L28.3348 7.7772ZM20.2388 14.8612L19.6388 15.6612C20.0168 15.9447 20.5417 15.9249 20.8973 15.6138L20.2388 14.8612ZM12.1813 8.81803L12.7813 8.01803L12.7813 8.01803L12.1813 8.81803ZM10.9228 8.86546L11.5813 9.61803L10.9228 8.86546ZM3.875 15.0322H2.875C2.875 15.4246 3.10447 15.7807 3.46178 15.9429C3.81909 16.105 4.23821 16.0432 4.5335 15.7848L3.875 15.0322ZM2.875 2H4.875C4.875 0.89543 3.97957 0 2.875 0V2ZM2.875 2V0C1.77043 0 0.875 0.89543 0.875 2H2.875ZM2.875 23.7651V2H0.875V23.7651H2.875ZM2.875 23.7651H0.875C0.875 24.8696 1.77043 25.7651 2.875 25.7651V23.7651ZM28.9931 23.7651H2.875V25.7651H28.9931V23.7651ZM28.9931 23.7651V25.7651C30.0976 25.7651 30.9931 24.8696 30.9931 23.7651H28.9931ZM28.9931 23.7651H30.9931C30.9931 22.6605 30.0976 21.7651 28.9931 21.7651V23.7651ZM3.875 23.7651H28.9931V21.7651H3.875V23.7651ZM2.875 17.6898V22.7651H4.875V17.6898H2.875ZM10.9712 10.1518L3.2165 16.9372L4.5335 18.4424L12.2882 11.657L10.9712 10.1518ZM20.2873 16.1475L12.2297 10.1044L11.0297 11.7044L19.0873 17.7475L20.2873 16.1475ZM20.2873 16.1475L20.2873 16.1475L19.0873 17.7475C19.8433 18.3146 20.8931 18.275 21.6043 17.6527L20.2873 16.1475ZM28.9933 8.52978L20.2873 16.1475L21.6043 17.6527L30.3103 10.0349L28.9933 8.52978ZM28.9933 8.52978V8.52978L30.3103 10.0349C31.1416 9.30757 31.2258 8.04404 30.4985 7.21277L28.9933 8.52978ZM28.9933 8.52978L28.9933 8.52978L30.4985 7.21277C29.7711 6.3815 28.5076 6.29726 27.6763 7.02462L28.9933 8.52978ZM20.8973 15.6138L28.9933 8.52978L27.6763 7.02463L19.5803 14.1086L20.8973 15.6138ZM11.5813 9.61803L19.6388 15.6612L20.8388 14.0612L12.7813 8.01803L11.5813 9.61803ZM11.5813 9.61803L11.5813 9.61803L12.7813 8.01803C12.0252 7.451 10.9755 7.49056 10.2643 8.11288L11.5813 9.61803ZM4.5335 15.7848L11.5813 9.61803L10.2643 8.11288L3.2165 14.2797L4.5335 15.7848ZM2.875 2V15.0322H4.875V2H2.875Z"
                      fill="currentColor"
                      mask="url(#path-1-outside-1)"
                    />
                  </svg>
                )}
              </div>
            </Disclosure.Button>
          </div>
          <Disclosure.Panel>
            <div className="bg-dark-900 h-[200px] border border-dark-800 flex items-center justify-center">
              <Typography className="text-secondary">Insert chart here</Typography>
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  )
}

export default Chart
