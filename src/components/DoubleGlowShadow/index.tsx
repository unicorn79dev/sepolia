import { classNames } from 'app/functions'
import useDesktopMediaQuery from 'app/hooks/useDesktopMediaQuery'
import { FC } from 'react'

const DoubleGlowShadow: FC<{ className?: string }> = ({ children, className }) => {
  const isDesktop = useDesktopMediaQuery()

  return (
    <div className={classNames(className, 'relative w-full max-w-2xl')}>
      <div
        className={classNames(
          isDesktop ? 'from-pink/5 to-blue/5' : ' from-pink/25 to-blue/25',
          'fixed inset-0 bg-gradient-radial'
        )}
      />
      <div className="relative filter drop-shadow">{children}</div>
    </div>
  )
}

export default DoubleGlowShadow
