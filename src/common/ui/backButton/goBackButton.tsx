import { useNavigate } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'

import s from './backButton.module.scss'

type Props = {
  title: string
}

export const GoBackButton = ({ title = 'Return to Previous Page' }: Props) => {
  const navigate = useNavigate()
  const goBackHandler = () => navigate(-1)

  return (
    <div className={s.backButtonWrapper}>
      <Button className={s.backTo} onClick={goBackHandler} variant={'link'}>
        <ArrowBackOutline className={s.arrowBack} />
        {title}
      </Button>
    </div>
  )
}
