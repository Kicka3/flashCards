import { Typography } from '@/common/ui'
import { Checkbox } from '@/common/ui/сheckbox'

export function App() {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100vh',
        justifyContent: 'center',
      }}
    >
      <Typography as={'p'} theme={'dark'} variant={'captionLink'}>
        H33LO
      </Typography>
      <Checkbox disabled text={'Check me'} />
    </div>
  )
}
