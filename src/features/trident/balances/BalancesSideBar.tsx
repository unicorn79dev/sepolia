import Card from 'app/components/Card'
import Typography from 'app/components/Typography'
import useBalancesMenuItems from 'app/features/trident/balances/context/useBalancesMenuItems'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const BalancesSideBar = () => {
  const items = useBalancesMenuItems()
  const router = useRouter()

  return (
    <div className="flex-none w-52 border-r border-dark-900 pt-8 p-6 hidden lg:block">
      <div className="flex flex-col gap-2.5">
        {items.map(({ label, link }, index) => {
          if (!link) return
          const active = router.route === link
          const content = (
            <div className="py-3 px-5 cursor-pointer">
              <Typography className={active ? 'text-high-emphesis' : ''} weight={active ? 700 : 400}>
                {label}
              </Typography>
            </div>
          )

          return (
            <Link href={link} key={index} passHref={true}>
              {active ? <Card.Gradient className="opacity-20">{content}</Card.Gradient> : content}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default BalancesSideBar
