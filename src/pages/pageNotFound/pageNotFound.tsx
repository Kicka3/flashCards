import { Link } from 'react-router-dom'

import image from '@/assets/img/error404.png'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'

import s from './pageNotFound.module.scss'

type Props = {}

const PageNotFound = ({}: Props) => {
  return (
    <section className={s.wrapper}>
      <img src={image} />
      <Typography variant={'body1'}>Sorry! Page not found!</Typography>
      <Button as={Link} to={'/'} variant={'primary'}>
        Back to home page
      </Button>
    </section>
  )
}

export default PageNotFound
