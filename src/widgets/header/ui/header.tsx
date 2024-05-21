import { ComponentPropsWithoutRef } from 'react'
import { Link } from 'react-router-dom'

import { ROUTES } from '@/common/enums/enums'
import { Button } from '@/common/ui/button'
import Profile from '@/layout/header/ui/header-profile/headerProfile'
import { UserData } from '@/services/auth'

type Props = {
  isAuth: boolean
  isLoading: boolean
  profile: UserData | undefined
} & ComponentPropsWithoutRef<'header'>

export const Header = ({ children, className, isAuth, isLoading, profile, ...rest }: Props) => {
  let content = null

  if (isAuth && !isLoading) {
    content = <Profile profile={profile} />
  } else if (!isLoading) {
    content = (
      <Button as={Link} to={ROUTES.SIGN_IN} variant={'secondary'}>
        Sign In
      </Button>
    )
  }

  return (
    <header>
      <div {...rest}>
        <Link to={'/'}>HEADERL ogo</Link>
        {content}
      </div>
    </header>
  )
}
