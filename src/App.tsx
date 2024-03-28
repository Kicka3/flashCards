import LogOut from '@/assets/icons/log-out'
import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div>
      {/*<Button>Btn</Button>*/}
      <Button icon={<LogOut />}>Btn with icon</Button>
      {/*<Button as={'a'} href={'#'}>*/}
      {/*  Link Btn*/}
      {/*</Button>*/}
    </div>
  )
}
