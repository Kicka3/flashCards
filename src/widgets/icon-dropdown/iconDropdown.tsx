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
  learn?: () => void
  onEditClick?: () => void
  onOpenDeleteForm?: (open: boolean) => void
}

export const IconDropDown = ({ isEmpty, learn, onEditClick, onOpenDeleteForm }: Props) => {
  const openDeleteForm = () => {
    if (onOpenDeleteForm) {
      onOpenDeleteForm(true)
    }
  }

  return (
    <>
      <DropDownMenu trigger={<MoreVerticalOutline height={25} width={25} />}>
        <DropdownItem className={s.item} disabled={isEmpty} onSelect={learn}>
          <PlayCircleOutline height={'16px'} width={'16px'} />
          <Typography variant={'caption'}>Learn</Typography>
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

// import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
// import Edit2Outline from '@/assets/icons/components/Edit2Outline'
// import TrashOutline from '@/assets/icons/components/TrashOutline'
// import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
// import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
// import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
// import { Typography } from '@/common/ui/typography'
//
// import s from './iconDropdown.module.scss'
//
// export const IconDropDown = () => {
//   return (
//     <>
//       <DropDownMenu trigger={<MoreVerticalOutline height={25} width={25} />}>
//         <DropdownItem className={s.item} onClick={() => console.log('PLAY')}>
//           <PlayCircleOutline height={'16px'} width={'16px'} />
//           <Typography variant={'caption'}>Learn</Typography>
//         </DropdownItem>
//         <DropdownSeparator />
//         <DropdownItem className={s.item} onClick={() => console.log('EDIT')}>
//           <Edit2Outline height={'16px'} width={'16px'} />
//           <Typography variant={'caption'}>Edit</Typography>
//         </DropdownItem>
//         <DropdownSeparator />
//
//         <DropdownItem className={s.item} onClick={() => console.log('DELETE')}>
//           <TrashOutline height={'16px'} width={'16px'} />
//           <Typography variant={'caption'}>Delete</Typography>
//         </DropdownItem>
//       </DropDownMenu>
//     </>
//   )
// }
