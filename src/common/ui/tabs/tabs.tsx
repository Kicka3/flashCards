import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Typography } from '@/common/ui'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

/** Это развен не надо с большйо буквы назвать и вынести отсюда??! */
export type tabsType = {
  className?: string
  content?: ReactNode
  title?: string
  value?: string
}

export type Props = {
  disabled?: boolean
  label?: string
  onTabValueChange: (value: string) => void
  tabs: tabsType[]
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ disabled, label, onTabValueChange, tabs, ...rest }: Props) => {
  return (
    <TabsRadix.Root className={s.tabs} {...rest} onValueChange={onTabValueChange}>
      <Typography className={s.tabLabel} variant={'body2'}>
        {label}
      </Typography>
      <TabsRadix.List className={s.tabsList}>
        {tabs?.map((tab, i) => {
          return (
            <TabsRadix.Trigger
              className={s.tabsTrigger}
              disabled={disabled}
              key={i}
              value={`${tab.value}`}
            >
              <Typography as={'span'} className={s.title} variant={'body1'}>
                {tab.title}
              </Typography>
            </TabsRadix.Trigger>
          )
        })}
      </TabsRadix.List>
    </TabsRadix.Root>
  )
}
