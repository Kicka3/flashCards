import { ChangeEvent, ComponentPropsWithoutRef, ElementType, forwardRef } from 'react'

import { ZodError } from 'zod'

import { loaderSchema } from './loaderSchema'

type Props<T extends ElementType = 'input'> = {
  setPhoto: (image: File) => void
} & ComponentPropsWithoutRef<T>

export const ImageLoader = forwardRef<HTMLInputElement, Props>(({ setPhoto, ...rest }, ref) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]

    try {
      loaderSchema.parse(selectedFile)
      selectedFile && setPhoto(selectedFile)
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        // toast.error(error.errors?.[0]?.message ?? 'File validation error')
        console.log(error)
      } else {
        // toast.error(JSON.stringify(error))
        console.log(error)
      }
    }
  }

  return <input onChange={handleFileChange} ref={ref} type={'file'} {...rest} />
})
