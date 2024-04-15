import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

import { Typography } from '..'

export type Props = {
  minStepsBetweenThumbs?: number
  value: number[]
} & ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>(
  ({ className, minStepsBetweenThumbs = 1, value, ...rest }, ref) => {
    const classNames = clsx(s.SliderRoot, className)

    return (
      <div className={s.sliderWrapper}>
        <Typography as={'label'} className={s.value} variant={'body2'}>
          {value?.[0]}
        </Typography>
        <SliderRadix.Root
          className={classNames}
          minStepsBetweenThumbs={minStepsBetweenThumbs}
          ref={ref}
          value={value}
          {...rest}
        >
          <SliderRadix.Track className={s.SliderTrack}>
            <SliderRadix.Range className={s.SliderRange} />
          </SliderRadix.Track>

          {value.map((_, i) => (
            <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} key={i} />
          ))}
        </SliderRadix.Root>
        <Typography as={'label'} className={s.value} variant={'body2'}>
          {value?.[1]}
        </Typography>
      </div>
    )
  }
)
