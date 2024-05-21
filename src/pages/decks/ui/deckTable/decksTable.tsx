import { useCallback, useState } from 'react'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import noCoverImg from '@/assets/img/noImage.png'
import { useFilter } from '@/common/hooks/useFilter'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { Typography } from '@/common/ui/typography'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useDeckFilter } from '@/pages/decks/deckHooks'
import { Deck } from '@/services/decks'
import clsx from 'clsx'

import s from './decksTable.module.scss'

type Props = {
  decks: Deck[]
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
  const {
    findDeck,
    isOwner,
    // mappedDecks,
    orderBy,
    setOrderBy,
  } = useDeckFilter()

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
    [findDeck, setGetDeckId, setOpenEditMode]
  )

  /** Сортировка */

  const { currentPage, setCurrentPage } = useFilter()

  const onChangeOrderBy = (columnName: string) => {
    let newOrder = 'asc'

    if (orderBy === `${columnName}-asc`) {
      newOrder = 'desc'
    }

    setOrderBy(`${columnName}-${newOrder}`)

    if (orderBy === `${columnName}-desc`) {
      setOrderBy('') // сбрасываем сортировку полностью
    }

    if (currentPage !== 1) {
      setCurrentPage(1) // при сортировке сбрасывать на 1 страницу
    }
  }

  const classNames = {
    disabledIcon: clsx(isDeckBeingDeleted && s.disableIcon),
    tableHeadCell: {
      authorName: clsx(s.question, s.tableHeadCell, {
        [s.asc]: orderBy === 'author.name-asc',
        [s.desc]: orderBy === 'author.name-desc',
      }),
      cardsCount: clsx(s.grade, s.tableHeadCell, {
        [s.asc]: orderBy === 'cardsCount-asc',
        [s.desc]: orderBy === 'cardsCount-desc',
      }),
      name: clsx(s.answer, s.tableHeadCell, {
        [s.asc]: orderBy === 'name-asc',
        [s.desc]: orderBy === 'name-desc',
      }),
      updated: clsx(s.updated, s.tableHeadCell, {
        [s.asc]: orderBy === 'updated-asc',
        [s.desc]: orderBy === 'updated-desc',
      }),
    },
  }

  const openDeckHandler = (deckId: string) => {
    openDeck(deckId)
  }

  const onLearnDeck = (deckId: string) => {
    learnDeck(deckId)
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
            <TableHeadCell
              className={classNames.tableHeadCell.name}
              onClick={() => onChangeOrderBy('name')}
            >
              <Typography variant={'sub2'}>
                <span className={s.cursor}>Name</span>
              </Typography>
            </TableHeadCell>
            <TableHeadCell
              className={classNames.tableHeadCell.cardsCount}
              onClick={() => onChangeOrderBy('cardsCount')}
            >
              <Typography variant={'sub2'}>
                <span className={s.cursor}>Cards</span>
              </Typography>
            </TableHeadCell>
            <TableHeadCell
              className={classNames.tableHeadCell.updated}
              onClick={() => onChangeOrderBy('updated')}
            >
              <Typography variant={'sub2'}>
                <span className={s.cursor}>Last updated</span>
              </Typography>
            </TableHeadCell>
            <TableHeadCell
              className={classNames.tableHeadCell.authorName}
              onClick={() => onChangeOrderBy('author.name')}
            >
              <Typography variant={'sub2'}>
                <span className={s.cursor}>Author</span>
              </Typography>
            </TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decks?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>
                <span className={s.tableImTitleWrapper} onClick={() => openDeckHandler(deck.id)}>
                  {deck.cover ? (
                    <img alt={'cover'} className={s.deckCoverImg} src={deck.cover} />
                  ) : (
                    <img alt={'no cover'} className={s.deckCoverImg} src={noCoverImg} />
                  )}
                  <Typography className={s.deckTitle} variant={'sub2'}>
                    <span>{deck.name}</span>
                  </Typography>
                </span>
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.cardsCount}</TableCell>
              <TableCell className={s.deckPointer}>
                {new Date(deck.updated).toLocaleDateString('ru-ru')}
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.author.name}</TableCell>
              <TableCell>
                {isOwner(deck.userId) ? (
                  <div className={s.iconsContainer}>
                    {/*//Это сделать как Link...//*/}
                    <Button
                      className={deck.cardsCount === 0 ? s.disableIcon : ''}
                      disabled={!deck.cardsCount}
                      onClick={() => onLearnDeck(deck.id)}
                      variant={'icon'}
                    >
                      <PlayCircleOutline
                        className={clsx(deck.cardsCount === 0 && s.disableIcon)}
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
                  // Это сделать как Link...
                  <Button
                    className={clsx(deck.cardsCount === 0 && s.disableIcon)}
                    disabled={!deck.cardsCount}
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
