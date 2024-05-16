import { ChangeEvent, ElementRef, forwardRef, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { FileUploaderProps } from '@/common/types/types'
import { Typography } from '@/common/ui/typography'
import { ZodError, z } from 'zod'

export const IMAGE_SCHEMA = z
  .instanceof(File)
  .refine(file => file.size <= 1000000, `Max image size is 1MB. The file will not be uploaded.`)
  .refine(
    file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported. The file will not be uploaded.'
  )

export const FileUploader = forwardRef<ElementRef<'input'>, FileUploaderProps>(
  ({ className, name, setFile, trigger, validationSchema = IMAGE_SCHEMA, ...rest }, ref) => {
    const [errorMessage, setErrorMessage] = useState<null | string>(null)

    useEffect(() => {
      toast.error(errorMessage)
    }, [errorMessage])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      let error = null

      try {
        validationSchema.parse(file)
        setErrorMessage(null)
      } catch (e) {
        error = e as Error | ZodError

        if (error instanceof ZodError) {
          setErrorMessage('Validate error: ' + error.errors[0].message)
        } else {
          setErrorMessage('Native error: ' + error.message)
        }
        setFile(null)
      }
      if (!error) {
        file && setFile(file)
      }
    }

    return (
      <Typography as={'label'} className={className} htmlFor={name}>
        {trigger}
        <input
          // className={s.inputFile}
          id={name}
          onChange={onChangeHandler}
          ref={ref}
          type={'file'}
          {...rest}
        />
      </Typography>
    )
  }
)
