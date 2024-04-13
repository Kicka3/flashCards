import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as TabsRadix from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

import { Typography } from '..'

export type Props = {
  tabs: { content: ReactNode; disabled: boolean; title: string }[]
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ className, tabs, ...rest }: Props) => {
  const tabTitles = tabs.map(i => i.title)
  const tabContents = tabs.map(i => i.content)

  return (
    <TabsRadix.Root className={clsx(s.tabs, className)} {...rest}>
      <TabsRadix.List className={s.tabsList}>
        {tabTitles?.map((title, i) => (
          <TabsRadix.Trigger
            className={s.tabsTrigger}
            disabled={tabs[i].disabled}
            key={i}
            value={title}
          >
            <Typography as={'span'} className={s.title} variant={'body1'}>
              {title}
            </Typography>
          </TabsRadix.Trigger>
        ))}
      </TabsRadix.List>

      {tabContents?.map((content, i) => (
        <TabsRadix.Content className={s.tabsContent} key={i} value={tabs[i].title}>
          {content}
        </TabsRadix.Content>
      ))}
    </TabsRadix.Root>
  )
}
