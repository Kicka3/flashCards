import { IconDropDown } from '@/components/layout/header/icon-dropdown/iconDropdown'
import { UserDropDown } from '@/components/layout/header/user-dropdown/userDropdown'

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
      <IconDropDown description={user.alt} icon={user.img} />
    </>
  )
}
