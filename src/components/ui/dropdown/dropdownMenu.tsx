import { ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

type Props = { children?: ReactNode; trigger?: ReactNode }

export const DropdownMenu = ({ children, trigger }: Props) => {
  return (
    <>
      <DropdownMenuRadix.Root>
        <DropdownMenuRadix.Trigger>{trigger}</DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content>{children}</DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    </>
  )
}
