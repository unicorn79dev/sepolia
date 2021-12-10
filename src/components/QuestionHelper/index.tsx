import { QuestionMarkCircleIcon as SolidQuestionMarkCircleIcon } from '@heroicons/react/solid'
import React, { FC, useCallback, useState } from 'react'

import Tooltip from '../Tooltip'

const QuestionHelper: FC<{ text?: any; fullWidth?: boolean }> = ({ children, text, fullWidth = false }) => {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  if (children) {
    return (
      <Tooltip text={text} show={show} fullWidth={fullWidth}>
        <div
          className="flex items-center justify-center w-full outline-none"
          onClick={open}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          {children}
        </div>
      </Tooltip>
    )
  }

  return (
    <span className="ml-1">
      <Tooltip text={text} show={show}>
        <div
          className="flex items-center justify-center outline-none cursor-help hover:text-primary"
          onClick={open}
          onMouseEnter={open}
          onMouseLeave={close}
        >
          <SolidQuestionMarkCircleIcon width={16} height={16} />
        </div>
      </Tooltip>
    </span>
  )
}

export default QuestionHelper
