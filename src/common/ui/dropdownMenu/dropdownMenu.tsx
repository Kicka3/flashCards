// import { ComponentPropsWithoutRef, ReactNode } from 'react'
//
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
//
// import s from './dropdownMenu.module.scss'
//
// type Props = {
//   children?: ReactNode
//   defaultOpen?: boolean
//   modal?: boolean
//   trigger?: ReactNode
// } & ComponentPropsWithoutRef<typeof DropdownMenu.Content>
// export const DropDownMenu = ({
//   children,
//   defaultOpen = true,
//   modal = false,
//   trigger,
//   ...rest
// }: Props) => {
//   return (
//     <>
//       <DropdownMenu.Root defaultOpen={defaultOpen} modal={modal}>
//         <DropdownMenu.Trigger asChild className={s.dropDownMenuTrigger}>
//           {trigger}
//         </DropdownMenu.Trigger>
//         <DropdownMenu.Portal>
//           <DropdownMenu.Content
//             align={'end'}
//             className={s.dropDownMenuContent}
//             sideOffset={12}
//             {...rest}
//           >
//             {children}
//             <DropdownMenu.Arrow asChild className={s.dropDownMenuArrow}>
//               <div className={s.dropDownMenuArrowDiv} />
//             </DropdownMenu.Arrow>
//           </DropdownMenu.Content>
//         </DropdownMenu.Portal>
//       </DropdownMenu.Root>
//     </>
//   )
// }

import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type Props = {
  children: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Content>
export const DropDownMenu = ({ children, trigger, ...rest }: Props) => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild className={s.dropDownMenuTrigger}>
          {trigger}
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align={'end'}
            className={s.dropDownMenuContent}
            sideOffset={12}
            {...rest}
          >
            {children}
            <DropdownMenu.Arrow asChild className={s.dropDownMenuArrow}>
              <div className={s.dropDownMenuArrowDiv} />
            </DropdownMenu.Arrow>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </>
  )
}
