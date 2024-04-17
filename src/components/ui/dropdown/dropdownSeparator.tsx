import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownSeparator.module.scss'

type Props = ComponentPropsWithoutRef<typeof DropdownMenuRadix.DropdownMenuSeparator>

export const DropdownSeparator = ({ className }: Props) => {
  const classNames = {
    dropdownContainer: clsx(className, s.separatorContainer),
  }

  return <DropdownMenuRadix.DropdownMenuSeparator className={classNames.dropdownContainer} />
}
