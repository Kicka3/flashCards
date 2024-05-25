import { Link } from 'react-router-dom'

import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { Button } from '@/common/ui/button'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
import { Typography } from '@/common/ui/typography'

import s from './iconDropdown.module.scss'

type Props = {
  isEmpty?: boolean
  onEditClick?: () => void
  onOpenDeleteForm?: (open: boolean) => void
}

export const IconDropDown = ({ onEditClick, onOpenDeleteForm }: Props) => {
  const openDeleteForm = () => {
    if (onOpenDeleteForm) {
      onOpenDeleteForm(true)
    }
  }

  return (
    <>
      <DropDownMenu
        trigger={
          <Button variant={'icon'}>
            <MoreVerticalOutline height={25} width={25} />
          </Button>
        }
      >
        <DropdownItem asChild>
          <Button as={Link} className={s.link} to={'learn'}>
            <PlayCircleOutline height={'16px'} width={'16px'} />
            <Typography variant={'caption'}>Learn</Typography>
          </Button>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={onEditClick}>
          <Edit2Outline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Edit</Typography>
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem onSelect={openDeleteForm}>
          <TrashOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Delete</Typography>
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
