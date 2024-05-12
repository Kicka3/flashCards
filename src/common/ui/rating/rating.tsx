import StarFilled from '@/assets/icons/components/Star'
import StarOutline from '@/assets/icons/components/StarOutline'

import s from './rating.module.scss'

type Props = {
  className?: string
  rating: number
}

export const Rating = ({ rating }: Props) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <StarFilled className={s.icon} key={i} />
    ) : (
      <StarOutline className={s.icon} key={i} />
    )
  )

  return <div className={s.wrapper}>{stars}</div>
}
