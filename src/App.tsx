import { UserDropDown } from '@/components/layot/header/user-dropdown/userDropdown'
import { Typography } from '@/components/ui'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown/dropdownSeparator'

const user = {
  alt: 'no card',
  email: 'allca@mail.com',
  img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  name: 'nick',
}

export function App() {
  return (
    <>
      <UserDropDown description={user.alt} email={user.email} img={user.img} name={user.name} />
    </>
  )
}
