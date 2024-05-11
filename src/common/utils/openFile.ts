import { RefObject } from 'react'

export const openFiles = (ref: RefObject<HTMLInputElement>) => {
  if (ref.current) {
    ref.current.click()
  }
}
