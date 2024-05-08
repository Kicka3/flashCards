import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Typography } from '@/common/ui'
import * as TabsRadix from '@radix-ui/react-tabs'

import s from './tabs.module.scss'

export type tabsType = {
  className?: string
  content?: ReactNode
  title?: string
  value?: string
}

export type Props = {
  disabled?: boolean
  label?: string
  tabs: tabsType[]
} & ComponentPropsWithoutRef<typeof TabsRadix.Root>

export const Tabs = ({ disabled, label, tabs, ...rest }: Props) => {
  return (
    <TabsRadix.Root className={s.tabs} {...rest}>
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
      {/*{tabContents?.map((content, i) => (*/}
      {/*  <TabsRadix.Content className={s.tabsContent} key={i} value={tabs[i].title}>*/}
      {/*    {content}*/}
      {/*  </TabsRadix.Content>*/}
      {/*))}*/}
    </TabsRadix.Root>
  )
}

// export type Props = {
//     tabs: { content: ReactNode; disabled: boolean; title: string }[]
// } & ComponentPropsWithoutRef<typeof TabsRadix.Root>
//
// export const Tabs = ({ className, tabs, ...rest }: Props) => {
//     const tabTitles = tabs.map(i => i.title)
//     const tabContents = tabs.map(i => i.content)
//
//     return (
//         <TabsRadix.Root className={clsx(s.tabs, className)} {...rest}>
//             <TabsRadix.List className={s.tabsList}>
//                 {tabTitles?.map((title, i) => (
//                     <TabsRadix.Trigger
//                         className={s.tabsTrigger}
//                         disabled={tabs[i].disabled}
//                         key={i}
//                         value={title}
//                     >
//                         <Typography as={'span'} className={s.title} variant={'body1'}>
//                             {title}
//                         </Typography>
//                     </TabsRadix.Trigger>
//                 ))}
//             </TabsRadix.List>
//
//             {tabContents?.map((content, i) => (
//                 <TabsRadix.Content className={s.tabsContent} key={i} value={tabs[i].title}>
//                     {content}
//                 </TabsRadix.Content>
//             ))}
//         </TabsRadix.Root>
//     )
// }
