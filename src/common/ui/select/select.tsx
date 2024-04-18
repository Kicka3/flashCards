import React, { ComponentPropsWithoutRef } from 'react'

import { ArrowIosDownOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import * as SelectPrimitive from '@radix-ui/react-select'

import s from './select.module.scss'

type SelectType = {
  ariaLabel?: string
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

export const Select = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Root>, SelectType>(
  ({ ariaLabel, children, placeholder, ...props }, forwardedRef) => {
    return (
      <>
        {props.label && (
          <Typography as={'label'} className={s.label} variant={'body2'}>
            label{' '}
          </Typography>
        )}

        <SelectPrimitive.Root {...props}>
          <SelectPrimitive.Trigger
            aria-label={ariaLabel}
            className={s.selectTrigger}
            ref={forwardedRef}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon className={s.selectIcon}>
              <ArrowIosDownOutline height={'20px'} width={'20px'} />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={s.selectContent}
              collisionPadding={0}
              position={'popper'}
            >
              <SelectPrimitive.ScrollUpButton></SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className={s.selectViewport}>
                {children}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton>
                <ArrowIosDownOutline height={'20px'} width={'20px'} />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </>
    )
  }
)

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item className={s.selectItem} {...props} ref={forwardedRef}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
})
