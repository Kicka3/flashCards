import { Typography } from '@/components/ui'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown/dropdownSeparator'

type Props = {
  description: string
  email: string
  img: string
  name: string
}

export const UserDropDown = ({ description, email, img, name }: Props) => {
  return (
    <>
      {' '}
      <DropdownMenu trigger={<img alt={description} src={img} />}>
        <DropdownItem>
          <Typography variant={'h1'}>{name}</Typography>
          <Typography variant={'body1'}> {email}</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>My Profile</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Sign out</DropdownItem>
      </DropdownMenu>
    </>
  )
}
