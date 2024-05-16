import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useState } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import clsx from 'clsx'

import s from './slider.module.scss'

type Props = ComponentPropsWithoutRef<typeof SliderRadix.Root>

export const Slider = forwardRef<ElementRef<typeof SliderRadix.Root>, Props>(
  (
    {
      className,
      defaultValue = [0, 5],
      disabled,
      max,
      min,
      minStepsBetweenThumbs = 1,
      onValueCommit,
      value,
      ...rest
    },
    ref
  ) => {
    const [sliderValue, setSliderValue] = useState(defaultValue)
    const classNames = clsx(s.SliderRoot, className)

    useEffect(() => {
      setSliderValue(defaultValue)
    }, [defaultValue])

    const onChangeValueHandler = (data: number[]) => {
      setSliderValue(data)
    }

    const handleChangeValidator = (newValue: string, side?: 'left' | 'right') => {
      const temp = [...defaultValue]
      const clampedValue = Math.min(Number(newValue), max ? max : defaultValue[1])

      if (side === 'left') {
        temp[0] = clampedValue
      } else if (side === 'right') {
        temp[1] = clampedValue
      }

      if (temp[0] > temp[1]) {
        setSliderValue([temp[1], temp[0]])
      } else {
        setSliderValue(temp)
      }
    }

    const onBlurHandler = () => {
      onValueCommit?.(sliderValue)
    }

    return (
      <div className={s.sliderWrapper}>
        <input
          className={s.inputValue}
          disabled={disabled}
          onBlur={onBlurHandler}
          onChange={e => handleChangeValidator(e.target.value, 'left')}
          pattern={'[0-100]'}
          type={'number'}
          value={sliderValue[0].toString()}
        />
        <SliderRadix.Root
          className={classNames}
          disabled={disabled}
          max={max}
          onValueChange={onChangeValueHandler}
          onValueCommit={onValueCommit}
          ref={ref}
          value={sliderValue}
          {...rest}
        >
          <SliderRadix.Track className={s.SliderTrack}>
            <SliderRadix.Range className={s.SliderRange} />
          </SliderRadix.Track>

          <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} />
          <SliderRadix.Thumb aria-label={'Volume'} className={s.SliderThumb} />
        </SliderRadix.Root>

        <input
          className={s.inputValue}
          disabled={disabled}
          onBlur={onBlurHandler}
          onChange={e => handleChangeValidator(e.target.value, 'right')}
          pattern={'[0-100]'}
          type={'number'}
          value={sliderValue[1].toString()}
        />
      </div>
    )
  }
)
