import { IconDropDown } from '@/layout/header/icon-dropdown/iconDropdown'
import { UserDropDown } from '@/layout/header/user-dropdown/userDropdown'

const user = {
  alt: 'no card',
  email: 'allca@mai3213132l.com',
  img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  name: 'nick',
}

export function App() {
  return (
    <>
      <UserDropDown description={user.alt} email={user.email} img={user.img} name={user.name} />
      <IconDropDown />
    </>
import { Typography } from '@/common/ui'
import { Checkbox } from '@/common/ui/сheckbox'

export function App() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Typography as={'p'} theme={'dark'} variant={'captionLink'}>
        H33LO
      </Typography>
      <Checkbox disabled text={'Check me'} />
    </div>
  )
}
