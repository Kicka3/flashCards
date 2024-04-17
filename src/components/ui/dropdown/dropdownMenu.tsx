import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as DropdownMenuRadix from '@radix-ui/react-dropdown-menu'

import s from './dropdownMenu.module.scss'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof DropdownMenuRadix.Content>
export const DropdownMenu = ({ children, trigger }: Props) => {
  return (
    <>
      <DropdownMenuRadix.Root>
        <DropdownMenuRadix.Trigger className={s.dropDownMenuTrigger}>
          {trigger}
        </DropdownMenuRadix.Trigger>
        <DropdownMenuRadix.Portal>
          <DropdownMenuRadix.Content className={s.dropDownMenuContent} sideOffset={12}>
            {children}
          </DropdownMenuRadix.Content>
        </DropdownMenuRadix.Portal>
      </DropdownMenuRadix.Root>
    </>
  )
}

//oldStyles
// .dropDownMenuContent {
//   position: relative;
//
//   display: flex;
//   flex-direction: column;
//
//   width: 100%;
//   min-width: 217px;
//   margin-top: 5px;
//   padding: 12px;
//
//   background: var(--color-dark-700);
//   border: 2px solid var(--color-dark-500);
//   border-radius: 4px;
//
//   //Сделать позиционированием
//   //подвинуть контейнер
// }
//
// .dropDownMenuContent::before {
//   content: '';
//
//   position: absolute;
//   top: -10px;
//   left: 50%;
//   transform: translateX(-50%);
//
//   border-right: 10px solid transparent;
//   border-bottom: 10px solid var(--color-dark-500);
//   border-left: 10px solid transparent;
// }
//
// .dropDownMenuContent::after {
//   content: '';
//   position: absolute;
//   bottom: 0; /* Позиционирование снизу */
//   left: 50%;
// }
//
// .dropDownMenuTrigger {
//   all: unset;
//   cursor: pointer;
// }
//
// .dropDownMenuTrigger::before {
//   content: '';
// }
//
// @keyframes slideUpAndFade {
//   from {
//     transform: translateY(2px);
//     opacity: 0;
//   }
//
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
// }
//
// @keyframes slideRightAndFade {
//   from {
//     transform: translateX(-2px);
//     opacity: 0;
//   }
//
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// }
//
// @keyframes slideDownAndFade {
//   from {
//     transform: translateY(-2px);
//     opacity: 0;
//   }
//
//   to {
//     transform: translateY(0);
//     opacity: 1;
//   }
// }
//
// @keyframes slideLeftAndFade {
//   from {
//     transform: translateX(2px);
//     opacity: 0;
//   }
//
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// }
