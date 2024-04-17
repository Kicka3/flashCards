import { Typography } from '@/components/ui'
import { DropdownMenu } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown/dropdownSeparator'

import s from './iconDropdown.module.scss'

type Props = {
  description: string
  icon: string
}

export const IconDropDown = ({ description, icon }: Props) => {
  return (
    <>
      <DropdownMenu trigger={<img alt={description} src={icon} />}>
        <DropdownItem className={s.item}>
          Learn Icon
          <Typography variant={'caption'}>Learn</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          Edit Icon
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem className={s.item}>
          Delete Icon
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </DropdownMenu>
    </>
  )
}
