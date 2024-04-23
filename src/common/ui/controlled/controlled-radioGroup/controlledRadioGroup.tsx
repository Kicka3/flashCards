import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '@/common/ui/radioGroup'

type ControlledRadioGroupProps<T extends FieldValues> = Omit<
  RadioGroupProps,
  'onValueChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledRadioGroup = <T extends FieldValues>({
  control,
  disabled,
  name,
  shouldUnregister,
  ...rest
}: ControlledRadioGroupProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name, shouldUnregister })

  return <RadioGroup {...rest} name={name} onValueChange={onChange} value={value} />
}
