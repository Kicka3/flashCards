import { Modal } from '@/components/ui/modal'
import { Typography } from '@/components/ui/typography'

export function App() {
  const open = () => {
    console.log('open')

    return true
  }

  return (
    <>
      <Typography as={'p'} theme={'dark'} variant={'captionLink'}>
        H33LO
      </Typography>
      <Modal onOpenChange={open} open />
    </>
  )
}
