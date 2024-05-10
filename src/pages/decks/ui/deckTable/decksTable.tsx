import { useState } from 'react'

import {
  ArrowIosDownOutline,
  ArrowIosUp,
  Edit2Outline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons/components'
import noCoverImg from '@/assets/img/noImage.png'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { DeleteForm } from '@/features/deck/deleteForm'
import { useSortDecks } from '@/pages/decks/deckHooks'
import { Sort } from '@/services/common.types'
import { MyDeck } from '@/services/decks'

import s from './decksTable.module.scss'

type Props = {
  decks: MyDeck[]
  isOwner: (userId: string) => boolean
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  onSort?: (sort: Sort) => void
  sort?: Sort
}

export const DecksTable = ({ decks, isOwner, onDeleteClick, onEditClick, onSort, sort }: Props) => {
  const [deleteForm, setDeleteForm] = useState(false)
  const { handleSort, sortedDecks } = useSortDecks(decks, sort, onSort)

  /** Сохраняю ID колоды */
  const [IdDeletedDeck, setIdDeletedDeck] = useState<string | undefined>('')

  const handleEditeClick = (id: string) => () => onEditClick?.(id)

  const closeDeleteFormHandler = () => {
    setDeleteForm(false)
  }

  /** Удаляю по id из form*/
  const onDeleteDeck = (id: string) => {
    if (id) {
      onDeleteClick?.(id)
    }
  }
  /** Нажатие на иконку */
  const clickDeleteHandler = (id: string) => () => {
    setIdDeletedDeck(id)
    setDeleteForm(true)
  }

  /** !!!! Ищу нужную колоду чтобы достать name и id !!!! */
  const deckWillDelete = decks?.find(d => d.id === IdDeletedDeck)

  /** Функция для отрисовки стрелки сортировки */
  const renderSortArrow = (key: string) => {
    if (sort?.key === key) {
      return (
        <span className={s.arrowWrapper}>
          {sort.direction === 'asc' ? (
            <ArrowIosUp className={s.arrow} height={16} width={16} />
          ) : (
            <ArrowIosDownOutline className={s.arrow} height={16} width={16} />
          )}
        </span>
      )
    }

    return null
  }

  return (
    <>
      <Table className={s.tableContainer}>
        <TableHead>
          <TableRow>
            <DeleteForm
              close={closeDeleteFormHandler}
              deleteAction={id => {
                onDeleteDeck(id)
              }}
              id={IdDeletedDeck}
              isDeck
              isOpen={deleteForm}
              name={deckWillDelete?.name}
              onOpenChange={setDeleteForm}
              title={'Delete Pack'}
            />
            {/*<TableHeadCell className={s.classNames} onClick={() => handleSort('name')}>*/}
            <TableHeadCell onClick={() => handleSort('name')}>
              <Typography variant={'sub2'}>Name {renderSortArrow('name')}</Typography>
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('cardsCount')}>
              <Typography variant={'sub2'}>Cards {renderSortArrow('cardsCount')}</Typography>
            </TableHeadCell>
            {/*<TableHeadCell onClick={() => handleSort('updated')}>*/}
            <TableHeadCell onClick={() => handleSort('updated')}>
              <Typography variant={'sub2'}>Last updated {renderSortArrow('updated')}</Typography>
            </TableHeadCell>
            {/*<TableHeadCell onClick={() => handleSort('author.name')}>*/}
            <TableHeadCell onClick={() => handleSort('author.name')}>
              <Typography variant={'sub2'}>Author {renderSortArrow('author.name')}</Typography>
            </TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDecks?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>
                <span className={s.tableImTitleWrapper}>
                  {deck.cover ? (
                    <img alt={'cover'} className={s.deckCoverImg} src={deck.cover} />
                  ) : (
                    <img alt={'noCover'} className={s.deckCoverImg} src={noCoverImg} />
                  )}

                  <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
                    {deck.name}
                  </Typography>
                </span>
              </TableCell>
              <TableCell>{deck.cards}</TableCell>
              <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
              <TableCell>{deck.createdBy}</TableCell>
              <TableCell>
                {isOwner(deck.userId) ? (
                  <div className={s.iconsContainer}>
                    <Button onClick={handleEditeClick(deck.id)} variant={'icon'}>
                      <Edit2Outline height={'16px'} width={'16px'} />
                    </Button>
                    <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
                      <PlayCircleOutline height={'16px'} width={'16px'} />
                    </Button>
                    <Button onClick={clickDeleteHandler(deck.id)} variant={'icon'}>
                      <TrashOutline height={'16px'} width={'16px'} />
                    </Button>
                  </div>
                ) : (
                  <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
                    <PlayCircleOutline height={'16px'} width={'16px'} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
