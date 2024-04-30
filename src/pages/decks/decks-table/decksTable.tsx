import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'

import s from './decksTable.module.scss'

type Deck = {
  cards: number
  createdBy: string
  id: string
  lastUpdated: string
  name: string
}

type Props = {
  decks: Deck[] | undefined
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
}

export const DecksTable = ({ decks, onDeleteClick, onEditClick }: Props) => {
  const handleEditeClick = (id: string) => () => onEditClick?.(id)
  const handleDeleteClick = (id: string) => () => onDeleteClick?.(id)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>Last updated</TableHeadCell>
          <TableHeadCell>Author</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
                {deck.name}
              </Typography>
            </TableCell>
            <TableCell>{deck.cards}</TableCell>
            <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
            <TableCell>{deck.createdBy}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                {/*//Исправить пути!*/}
                <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
                  <PlayCircleOutline height={'16px'} width={'16px'} />
                </Button>
                <Button onClick={handleEditeClick(deck.id)} variant={'icon'}>
                  <Edit2Outline height={'16px'} width={'16px'} />
                </Button>
                <Button onClick={handleDeleteClick(deck.id)} variant={'icon'}>
                  <TrashOutline height={'16px'} width={'16px'} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
