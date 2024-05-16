import { Link } from 'react-router-dom'

import elvelope from '@/assets/img/envelope.png'
import { Button } from '@/common/ui/button'
import { Card } from '@/common/ui/card'
import { Typography } from '@/common/ui/typography'

import s from './checkEmail.module.scss'

type Props = { email: string }

export const CheckEmail = ({ email }: Props) => {
  return (
    <Card className={s.container}>
      <Typography as={'h1'} className={s.header} variant={'h1'}>
        Check Email
      </Typography>

      <div className={s.image}>
        <img alt={'elvelopeImage'} src={elvelope} />
      </div>
      <Typography className={s.description} variant={'body2'}>
        We&apos;ve sent an Email with instructions to {email}
      </Typography>
      <Button as={Link} className={s.button} fullWidth to={'/signIn'} type={'submit'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
