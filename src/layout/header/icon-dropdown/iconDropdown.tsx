import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { Typography } from '@/common/ui'
import { DropDownMenu } from '@/components/ui/dropdown'
import { DropdownItem } from '@/components/ui/dropdown/dropdownItem'
import { DropdownSeparator } from '@/components/ui/dropdown/dropdownSeparator'

import s from './iconDropdown.module.scss'

type Props = {}

export const IconDropDown = ({}: Props) => {
  return (
    <>
      <DropDownMenu trigger={<MoreVerticalOutline height={25} width={25} />}>
        <DropdownItem className={s.item}>
          <PlayCircleOutline />
          <Typography variant={'caption'}>Learn</Typography>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item}>
          <Edit2Outline />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem className={s.item}>
          <TrashOutline />
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
