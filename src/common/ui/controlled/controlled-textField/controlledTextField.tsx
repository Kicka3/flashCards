import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/common/ui/textField'

type ControlledTextFieldProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'disabled' | 'rules'
> &
  Omit<TextFieldProps, 'checked' | 'onChange'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps<T>) => {
  const { field } = useController({
    control,
    disabled: rest.disabled,
    name: rest.name,
    shouldUnregister,
  })

  return <TextField {...rest} {...field} />
}
