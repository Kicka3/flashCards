import { Link } from 'react-router-dom'

import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
import { Typography } from '@/common/ui/typography'

import s from './iconDropdown.module.scss'

type Props = {
  isEmpty: boolean
  onEditClick?: () => void
  onOpenDeleteForm?: (open: boolean) => void
}

export const IconDropDown = ({ isEmpty, onEditClick, onOpenDeleteForm }: Props) => {
  const openDeleteForm = () => {
    if (onOpenDeleteForm) {
      onOpenDeleteForm(true)
    }
  }

  return (
    <>
      <DropDownMenu trigger={<MoreVerticalOutline height={25} width={25} />}>
        <DropdownItem className={s.item} disabled={isEmpty}>
          <Link className={s.linkLearn} to={'learn'}>
            <PlayCircleOutline height={'16px'} width={'16px'} />
            <Typography variant={'caption'}>Learn</Typography>
          </Link>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem className={s.item} onSelect={onEditClick}>
          <Edit2Outline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem className={s.item} onSelect={openDeleteForm}>
          <TrashOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
