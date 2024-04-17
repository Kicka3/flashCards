import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownMenu.module.scss'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content>
export const DropdownMenu = ({ children, className, trigger }: Props) => {
  const classNames = {
    dropdownContainer: clsx(s.container, className),
    trigger: clsx(className, s.trigger),
  }

  return (
    <>
      <DropdownMenuRadix.Root>
        <DropdownMenuRadix.Trigger className={classNames.trigger}>
          {trigger}
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content className={classNames.dropdownContainer}>
            {children}
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    </>
  )
}
