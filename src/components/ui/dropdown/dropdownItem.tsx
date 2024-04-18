import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdownItem.module.scss'
type Props = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItem = ({ className, ...rest }: Props) => {
  const classNames = {
    dropdownItem: clsx(className, s.dropdownItem),
  }

  return (
    <>
      <DropdownMenuRadix.Item
        {...rest}
        className={classNames.dropdownItem}
      ></DropdownMenuRadix.Item>
    </>
  )
}
