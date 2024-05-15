import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox } from '@/common/ui/сheckbox'
import { CheckboxProps } from '@radix-ui/react-checkbox'

type CheckboxControlledProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<CheckboxProps, 'checked' | 'onValueChange'> & {
    text: string
  }

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: CheckboxControlledProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({ control, name, shouldUnregister })

  return <Checkbox checked={value} onCheckedChange={onChange} {...rest} />
}
