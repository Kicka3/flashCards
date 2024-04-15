import { ComponentPropsWithoutRef } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

type Props = {} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Item>

export const DropdownItem = ({ className, ...rest }: Props) => {
  return (
    <>
      <DropdownMenuRadix.Item {...rest}></DropdownMenuRadix.Item>
    </>
  )
}
