import { useCallback, useState } from 'react'

import {
  ArrowIosDownOutline,
  ArrowIosUp,
  Edit2Outline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons/components'
import noCoverImg from '@/assets/img/noImage.png'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { Typography } from '@/common/ui/typography'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useDeckFilter, useSortDecks } from '@/pages/decks/deckHooks'
import { MyDeck } from '@/services/decks'
import clsx from 'clsx'

import s from './decksTable.module.scss'

type Props = {
  decks: MyDeck[]
  isDeckBeingDeleted: boolean
  learnDeck: (deckId: string) => void
  onDeleteClick?: (deckId: string) => void
  onEditClick?: (deckId: string) => void
  openDeck: (deckId: string) => void
}

export const DecksTable = ({
  decks,
  isDeckBeingDeleted,
  learnDeck,
  onDeleteClick,
  openDeck,
}: Props) => {
  const [deleteForm, setDeleteForm] = useState<[boolean, string | undefined]>([false, undefined])
  const [openEditMode, setOpenEditMode] = useState(false)
  /** Пользовател. хуки */
  const { findDeck, isOwner, orderBy, setSortedBy } = useDeckFilter()
  const { handleSort, sortedDecks } = useSortDecks(decks, orderBy, setSortedBy)

  /** Сохраняю ID колоды */
  const [getDeckId, setGetDeckId] = useState<string | undefined>('')

  const closeDeleteFormHandler = useCallback(() => {
    setDeleteForm([false, undefined])
  }, [])

  /** Удаляю по id из form*/
  const onDeleteDeck = async (id: string) => {
    if (id) {
      onDeleteClick?.(id)
    }
  }

  /** Delete Deck */
  const deleteDeckHandler = (id: string) => () => {
    setGetDeckId(id)
    const deckName = findDeck(id)

    setDeleteForm([true, deckName?.name])

    return deckName?.name
  }

  /** Update Deck */
  const editDeckHandler = useCallback(
    (id: string) => () => {
      const deckToEdit = findDeck(id)

      setGetDeckId(id)
      setOpenEditMode(true)

      return deckToEdit
    },
    [findDeck]
  )

  const openDeckHandler = (deckId: string) => {
    openDeck(deckId)
  }

  const onLearnDeck = (deckId: string) => {
    learnDeck(deckId)
  }

  /** Функция для отрисовки стрелки сортировки */
  const renderSortArrow = useCallback(
    (key: string) => {
      if (orderBy?.key === key) {
        return (
          <span className={s.arrowWrapper}>
            {orderBy.direction === 'asc' ? (
              <ArrowIosUp className={s.arrow} height={16} width={16} />
            ) : (
              <ArrowIosDownOutline className={s.arrow} height={16} width={16} />
            )}
          </span>
        )
      }

      return null
    },
    [orderBy]
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
              isOpen={deleteForm[0]}
              name={deleteForm[1]}
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
                  <Typography className={s.deckTitle} variant={'sub2'}>
                    {deck.name}
                  </Typography>
                </span>
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.cards}</TableCell>
              <TableCell className={s.deckPointer}>
                {new Date(deck.lastUpdated).toLocaleDateString('ru-ru')}
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.createdBy}</TableCell>
              <TableCell>
                {isOwner(deck.userId) ? (
                  <div className={s.iconsContainer}>
                    <Button
                      className={deck.cards === 0 ? s.disableIcon : ''}
                      disabled={!deck.cards}
                      onClick={() => onLearnDeck(deck.id)}
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
                  <Button
                    className={clsx(deck.cards === 0 && s.disableIcon)}
                    disabled={!deck.cards}
                    onClick={() => onLearnDeck(deck.id)}
                    variant={'icon'}
                  >
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
