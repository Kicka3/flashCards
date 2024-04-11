import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

export type Props = {
  backgroundColor?: string
  color?: string
} & ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>(
  ({ backgroundColor, className, id, ...rest }, ref) => {
    const classNames = {
      sliderContainer: clsx(className),
    }

    return (
      <SliderRadix.Root className={s.SliderRoot} defaultValue={[50]} max={100} step={1}>
        <SliderRadix.Track className={s.SliderTrack}>
          <SliderRadix.Range className={s.SliderRange} />
        </SliderRadix.Track>
        <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} />
      </SliderRadix.Root>
    )
  }
)
