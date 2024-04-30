import React from 'react'

import { Typography } from '@/common/ui'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'

import s from './decksTable.module.scss'

type Deck = {
  cards: number
  createdBy: string
  id: string
  lastupdated: string
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
            <TableCell>{new Date(deck.lastupdated).toLocaleString('ru-ru')}</TableCell>
            <TableCell>{deck.createdBy}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
