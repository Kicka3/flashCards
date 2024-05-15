import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
import { Typography } from '@/common/ui/typography'

import s from './iconDropdown.module.scss'

type Props = {}

export const IconDropDown = ({}: Props) => {
  return (
    <>
      <DropDownMenu trigger={<MoreVerticalOutline height={25} width={25} />}>
        <DropdownItem className={s.item}>
          <PlayCircleOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Learn</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <Edit2Outline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem className={s.item}>
          <TrashOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
