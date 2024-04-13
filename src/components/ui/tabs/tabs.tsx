import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

import { Typography } from '..'

export type Props = { tabs: { content: ReactNode; title: string }[] } & ComponentPropsWithoutRef<
  typeof TabsRadix.Root
>

export const Tabs = ({ className, tabs, ...rest }: Props) => {
  return (
    <TabsRadix.Root className={s.tabs} {...rest}>
      <TabsRadix.List className={s.tabsList}>
        {tabs.map((tab, i) => (
          <TabsRadix.Trigger className={s.tabsTrigger} key={i} value={tab.title}>
            <Typography variant={'body1'}>{tab.title}</Typography>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      {tabs.map((tab, i) => (
        <TabsRadix.Content className={s.tabsContent} key={i} value={tab.title}>
          {tab.content}
        </TabsRadix.Content>
      ))}
    </TabsRadix.Root>
  )
}
