import { Router } from '@/app/router/router'
import { TextField } from '@/common/ui/textField'

export function App() {
  return (
    <>
      <Router />
      <div>
        <TextField disabled value={'wqeqweqw'} variant={'search'} />
        <TextField disabled value={'222222'} variant={'default'} />
        <TextField disabled value={'3333333'} variant={'password'} />
      </div>
    </>
  )
}
