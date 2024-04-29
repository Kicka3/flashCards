import React, { ComponentPropsWithoutRef } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './select.module.scss'
const { Content, Group, Icon, Item, ItemText, Portal, Root, Trigger, Value, Viewport } =
  SelectPrimitive

export type SelectProps = {
  ariaLabel?: string
  className?: string
  label?: string
  options?: number[] | string[]
  placeholder?: string
} & ComponentPropsWithoutRef<typeof Root>

export const Select = React.forwardRef<React.ElementRef<typeof Root>, SelectProps>(
  (
    { ariaLabel, children, className, defaultValue, options, placeholder, ...props },
    forwardedRef
  ) => {
    const selectItems = options?.map(el => (
      <SelectItem key={el} value={String(el)}>
        {el}
      </SelectItem>
    ))

    return (
      <>
        {props.label && (
          <Typography as={'label'} className={s.label} variant={'body2'}>
            label
          </Typography>
        )}

        <Root defaultValue={defaultValue} {...props}>
          <Trigger aria-label={ariaLabel} className={s.selectTrigger} ref={forwardedRef}>
            <Value placeholder={placeholder} />
            <Icon className={s.selectIcon}>
              <ArrowIosDownOutline height={'16px'} width={'16px'} />
            </Icon>
          </Trigger>
          <Portal>
            <Content className={s.selectContent} position={'popper'}>
              <Viewport asChild className={s.selectViewport}>
                <Group className={s.selectGroup}>{selectItems}</Group>
              </Viewport>
            </Content>
          </Portal>
        </Root>
      </>
    )
  }
)

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <Item className={s.selectItem} {...props} ref={forwardedRef}>
      <ItemText>{children}</ItemText>
    </Item>
  )
})
