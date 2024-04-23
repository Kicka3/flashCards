import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type Props = {
  children?: ReactNode
  defaultOpen?: boolean
  disabled?: boolean
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenu.Content>
export const DropDownMenu = (props: Props) => {
  const { children, defaultOpen, disabled, trigger, ...rest } = props

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
