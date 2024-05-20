import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import clsx from 'clsx'

import s from './backButton.module.scss'

type Props = {
  className?: string
  title?: string
}

export const GoBackButton = ({ className, title = 'Return to Previous Page' }: Props) => {
  const navigate = useNavigate()
  const goBackHandler = () => navigate(-1)

  const classNames = {
    btnStyles: clsx(className, s.backTo),
  }

  return (
    <div className={s.backButtonWrapper}>
      <Button className={classNames.btnStyles} onClick={goBackHandler} variant={'link'}>
        <ArrowBackOutline className={s.arrowBack} height={'18px'} width={'18px'} />
        {title}
      </Button>
    </div>
  )
}
