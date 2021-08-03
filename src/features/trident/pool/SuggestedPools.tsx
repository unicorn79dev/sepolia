import { FC, useState } from 'react'
import ListCard from './ListCard'
import Typography from '../../../components/Typography'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Switch from '../../../components/Switch'

interface SuggestedPools {}

const SuggestedPools: FC<SuggestedPools> = () => {
  const { i18n } = useLingui()
  const [hide, setHide] = useState(false)

  return (
    <div className="flex flex-col gap-2 px-5 mt-2">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <Typography variant="lg" weight={700} className={hide ? 'text-low-emphesis' : ''}>
            {i18n._(t`Suggested Pools`)}
          </Typography>
          <Typography variant="xs" weight={400} className={hide ? 'text-low-emphesis' : ''}>
            {i18n._(t`Based on your Wallet and BentoBox balances`)}
          </Typography>
        </div>

        <Switch
          checked={hide}
          onChange={setHide}
          checkedIcon={
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.53078 0.729607C2.18371 0.300003 1.55409 0.233097 1.12448 0.580168C0.694881 0.92724 0.627974 1.55686 0.975046 1.98646C1.36989 2.4752 1.85186 3.00078 2.426 3.513L0.877061 6.19585C0.600919 6.67414 0.764794 7.28573 1.24309 7.56187C1.72138 7.83801 2.33297 7.67414 2.60911 7.19585L4.03615 4.72415C4.78786 5.19417 5.64183 5.60608 6.60356 5.90493L6.15188 8.46658C6.05597 9.01047 6.41914 9.52913 6.96304 9.62503C7.50693 9.72094 8.02559 9.35777 8.12149 8.81387L8.56077 6.32262C9.02244 6.37872 9.5037 6.4088 10.0049 6.4088C10.5041 6.4088 10.9835 6.37897 11.4435 6.3233L11.8829 8.81549C11.9788 9.35938 12.4975 9.72255 13.0414 9.62665C13.5853 9.53074 13.9484 9.01208 13.8525 8.46819L13.4009 5.90663C14.3631 5.60818 15.2175 5.19654 15.9697 4.72668L17.3874 7.18222C17.6635 7.66051 18.2751 7.82438 18.7534 7.54824C19.2317 7.2721 19.3956 6.66051 19.1194 6.18222L17.5802 3.51625C18.156 3.00301 18.6391 2.47625 19.0348 1.98649C19.3819 1.55688 19.315 0.927262 18.8854 0.580189C18.4558 0.233117 17.8262 0.300022 17.4791 0.729625C17.0187 1.29953 16.4326 1.91398 15.7086 2.47444C15.6906 2.48731 15.6733 2.50068 15.6564 2.51453C14.2861 3.56074 12.4294 4.4088 10.0049 4.4088C7.57482 4.4088 5.71514 3.55679 4.34391 2.50723C4.33091 2.49669 4.31758 2.48644 4.30394 2.47648C3.57869 1.91546 2.99176 1.30021 2.53078 0.729607Z"
                fill="#2E3348"
              />
            </svg>
          }
          uncheckedIcon={
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.9999 0.354095C7.97515 0.354095 5.14992 2.17485 3.35463 3.97034C2.45987 4.86519 1.815 5.75832 1.39251 6.42941C1.18077 6.76574 1.02346 7.04857 0.917354 7.25115C0.864266 7.35251 0.823885 7.434 0.79582 7.4923C0.781784 7.52145 0.770818 7.54483 0.762873 7.56201L0.753211 7.5831L0.750066 7.59008L0.748912 7.59265L0.74844 7.59371C0.748233 7.59418 0.748037 7.59462 1.66187 8.00072L0.748037 7.59462C0.63313 7.85319 0.633142 8.14833 0.74807 8.40689L1.66187 8.00072C0.74807 8.40689 0.748266 8.40733 0.748473 8.4078L0.748945 8.40886L0.750099 8.41143L0.753245 8.41841L0.762908 8.4395C0.770853 8.45668 0.78182 8.48005 0.795857 8.5092C0.823923 8.56749 0.864305 8.64896 0.917395 8.7503C1.0235 8.95284 1.18082 9.23562 1.39256 9.57188C1.81506 10.2428 2.45994 11.1358 3.35471 12.0305C5.15002 13.8256 7.97523 15.6459 11.9999 15.6459C16.0246 15.6459 18.8498 13.8256 20.6452 12.0305C21.5399 11.1358 22.1848 10.2428 22.6073 9.57188C22.819 9.23562 22.9764 8.95284 23.0825 8.7503C23.1356 8.64896 23.1759 8.56749 23.204 8.5092C23.218 8.48005 23.229 8.45668 23.237 8.4395L23.2466 8.41841L23.2498 8.41143L23.2509 8.40886L23.2514 8.4078C23.2516 8.40733 23.2518 8.40689 22.338 8.00072L23.2518 8.40689C23.3667 8.14833 23.3667 7.85319 23.2518 7.59462L22.338 8.00072C23.2518 7.59462 23.2516 7.59418 23.2514 7.59371L23.251 7.59265L23.2498 7.59008L23.2467 7.5831L23.237 7.56201C23.229 7.54483 23.2181 7.52145 23.204 7.4923C23.176 7.434 23.1356 7.35251 23.0825 7.25115C22.9764 7.04857 22.8191 6.76574 22.6074 6.42941C22.1849 5.75832 21.54 4.86519 20.6452 3.97034C18.8499 2.17485 16.0247 0.354095 11.9999 0.354095ZM3.08497 8.50617C2.96268 8.31196 2.86306 8.14085 2.78532 8.00066C2.86307 7.86042 2.96271 7.68925 3.08503 7.49496C3.44712 6.91981 4.0022 6.15127 4.76892 5.38448C6.29658 3.85665 8.64039 2.3541 11.9999 2.3541C15.3595 2.3541 17.7033 3.85665 19.2309 5.38448C19.9977 6.15127 20.5528 6.91981 20.9148 7.49496C21.0372 7.68925 21.1368 7.86042 21.2146 8.00066C21.1368 8.14085 21.0372 8.31196 20.9149 8.50617C20.5528 9.08118 19.9977 9.84954 19.231 10.6162C17.7034 12.1436 15.3596 13.6459 11.9999 13.6459C8.64031 13.6459 6.29648 12.1436 4.76884 10.6162C4.00213 9.84954 3.44706 9.08118 3.08497 8.50617ZM2.57482 7.59266C2.57461 7.59219 2.57457 7.59211 2.57471 7.59242L2.57482 7.59266ZM9.30719 8.00038C9.30719 6.51353 10.5125 5.30821 11.9994 5.30821C13.4862 5.30821 14.6915 6.51353 14.6915 8.00038C14.6915 9.48722 13.4862 10.6925 11.9994 10.6925C10.5125 10.6925 9.30719 9.48722 9.30719 8.00038ZM11.9994 3.30821C9.40794 3.30821 7.30719 5.40896 7.30719 8.00038C7.30719 10.5918 9.40794 12.6925 11.9994 12.6925C14.5908 12.6925 16.6915 10.5918 16.6915 8.00038C16.6915 5.40896 14.5908 3.30821 11.9994 3.30821Z"
                fill="#2E3348"
              />
            </svg>
          }
        />
      </div>
      {!hide && (
        <>
          <ListCard />
          <ListCard />
        </>
      )}
    </div>
  )
}

export default SuggestedPools
