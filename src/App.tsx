import LogOut from '@/assets/icons/log-out'
import { Button } from '@/components/ui/button'

export function App() {
  return (
    <div>
      <Button as={'button'} icon={<LogOut />}>
        Btn with icon
      </Button>
    </div>
  )
}
