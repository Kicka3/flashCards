import { Link } from 'react-router-dom'

import image from '@/assets/img/error404.png'
import { Button } from '@/common/ui/button'
import { Typography } from '@/common/ui/typography'

import s from './pageNotFound.module.scss'

type Props = {}

export const PageNotFound = ({}: Props) => {
  return (
    <section className={s.wrapper}>
      <img alt={'image'} src={image} />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'} variant={'primary'}>
        Back to home page
      </Button>
    </section>
  )
}
