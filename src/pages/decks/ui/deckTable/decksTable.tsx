import { useCallback, useState } from 'react'

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
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useSortDecks } from '@/pages/decks/deckHooks'
import { Sort } from '@/services/common.types'
import { MyDeck } from '@/services/decks'
import clsx from 'clsx'

import s from './decksTable.module.scss'

type Props = {
  decks: MyDeck[]
  isDeckBeingDeleted: boolean
  isOwner: (userId: string) => boolean
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  onSort?: (sort: Sort) => void
  openDeck: (deckId: string) => void
  sort?: Sort
}

export const DecksTable = ({
  decks,
  isDeckBeingDeleted,
  isOwner,
  onDeleteClick,
  onSort,
  openDeck,
  sort,
}: Props) => {
  const [deleteForm, setDeleteForm] = useState(false)
  const [openEditMode, setOpenEditMode] = useState(false)
  /**  */
  const { handleSort, sortedDecks } = useSortDecks(decks, sort, onSort)

  /** Сохраняю ID колоды */
  const [getDeckId, setGetDeckId] = useState<string | undefined>('')

  const closeDeleteFormHandler = useCallback(() => {
    setDeleteForm(false)
  }, [])

  /** Ищу нужную колоду */
  const findDeck = useCallback(
    (id: string) => {
      return decks.find(d => d.id === id)
    },
    [decks]
  )

  /** Удаляю по id из form*/
  const onDeleteDeck = useCallback(
    (id: string) => {
      if (id) {
        onDeleteClick?.(id)
      }
    },
    [onDeleteClick]
  )

  /** Удаляю Deck */
  const deleteDeckHandler = useCallback(
    (id: string) => () => {
      setGetDeckId(id)
      setDeleteForm(true)
    },
    []
  )

  /** Редактирую Deck */
  const editDeckHandler = useCallback(
    (id: string) => () => {
      const deckToEdit = findDeck(id)

      setGetDeckId(id)
      setOpenEditMode(true)

      return deckToEdit
    },
    [findDeck]
  )

  const openDeckHandler = useCallback((deckId: string) => {
    openDeck(deckId)
  }, [])

  const onLearnDeck = useCallback(() => {
    console.log('learn')
  }, [])

  /** Функция для отрисовки стрелки сортировки */
  const renderSortArrow = useCallback(
    (key: string) => {
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
    },
    [sort]
  )

  const classNames = {
    disabledIcon: clsx(isDeckBeingDeleted && s.disableIcon),
  }

  return (
    <>
      {getDeckId && (
        <UpdateDeck
          deck={findDeck(getDeckId)}
          isOpen={openEditMode}
          onOpenChange={setOpenEditMode}
          title={'Update Deck'}
        />
      )}

      <Table className={s.tableContainer}>
        <TableHead>
          <TableRow>
            <DeleteForm
              close={closeDeleteFormHandler}
              deleteAction={id => {
                onDeleteDeck(id)
              }}
              id={getDeckId}
              isDeck
              isOpen={deleteForm}
              name={findDeck?.name}
              onOpenChange={setDeleteForm}
              title={'Delete Pack'}
            />
            <TableHeadCell onClick={() => handleSort('name')}>
              <Typography variant={'sub2'}>Name {renderSortArrow('name')}</Typography>
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('cardsCount')}>
              <Typography variant={'sub2'}>Cards {renderSortArrow('cardsCount')}</Typography>
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('updated')}>
              <Typography variant={'sub2'}>Last updated {renderSortArrow('updated')}</Typography>
            </TableHeadCell>
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
                <span className={s.tableImTitleWrapper} onClick={() => openDeckHandler(deck.id)}>
                  {deck.cover ? (
                    <img alt={'cover'} className={s.deckCoverImg} src={deck.cover} />
                  ) : (
                    <img alt={'noCover'} className={s.deckCoverImg} src={noCoverImg} />
                  )}
                  <Typography variant={'body2'}>{deck.name}</Typography>
                </span>
              </TableCell>
              <TableCell>{deck.cards}</TableCell>
              <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
              <TableCell>{deck.createdBy}</TableCell>
              <TableCell>
                {isOwner(deck.userId) ? (
                  <div className={s.iconsContainer}>
                    <Button
                      className={deck.cards === 0 ? s.disableIcon : ''}
                      disabled={!deck.cards}
                      onClick={onLearnDeck}
                      variant={'icon'}
                    >
                      <PlayCircleOutline
                        className={clsx(deck.cards === 0 && s.disableIcon)}
                        height={'16px'}
                        width={'16px'}
                      />
                    </Button>
                    <Button
                      disabled={isDeckBeingDeleted}
                      onClick={editDeckHandler(deck.id)}
                      variant={'icon'}
                    >
                      <Edit2Outline
                        className={classNames.disabledIcon}
                        height={'16px'}
                        width={'16px'}
                      />
                    </Button>
                    <Button
                      disabled={isDeckBeingDeleted}
                      onClick={deleteDeckHandler(deck.id)}
                      variant={'icon'}
                    >
                      <TrashOutline
                        className={classNames.disabledIcon}
                        height={'16px'}
                        width={'16px'}
                      />
                    </Button>
                  </div>
                ) : (
                  <Button onClick={onLearnDeck} variant={'icon'}>
                    <PlayCircleOutline
                      className={clsx(deck.cards && s.disableIcon)}
                      height={'16px'}
                      width={'16px'}
                    />
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
