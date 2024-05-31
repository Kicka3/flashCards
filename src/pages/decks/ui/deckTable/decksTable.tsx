import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { Typography } from '@/common/ui/typography'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { useMeQuery } from '@/services/auth'
import { Deck } from '@/services/decks'
import clsx from 'clsx'

import s from './decksTable.module.scss'

type Props = {
  decks: Deck[]
  isDeckBeingDeleted: boolean
  onChangeOrderBy: (columnName: string) => void
  onDeleteDeck: (id: string) => void
  orderBy: null | string
}

export const DecksTable = ({
  decks,
  isDeckBeingDeleted,
  onChangeOrderBy,
  onDeleteDeck,
  orderBy,
}: Props) => {
  /** Проверяем, является ли текущий пользователь владельцем колоды. */
  const { data: me } = useMeQuery()
  const isOwner = (userId: string) => {
    return userId === me?.id
  }

  /** Сортировка */
  const classNames = {
    disabledIcon: clsx(isDeckBeingDeleted && s.disableIcon),
    tableHeadCell: {
      actions: clsx(s.actions, s.tableHeadCell),
      authorName: clsx(s.authorName, s.tableHeadCell),
      cardsCount: clsx(s.cardsCount, s.tableHeadCell),
      name: clsx(s.name, s.tableHeadCell),
      updated: clsx(s.updated, s.tableHeadCell),
    },
    tableHeadCell_btn: {
      authorName: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'author.name-asc',
        [s.desc]: orderBy === 'author.name-desc',
      }),
      cardsCount: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'cardsCount-asc',
        [s.desc]: orderBy === 'cardsCount-desc',
      }),
      name: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'name-asc',
        [s.desc]: orderBy === 'name-desc',
      }),
      updated: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'updated-asc',
        [s.desc]: orderBy === 'updated-desc',
      }),
    },
  }

  return (
    <>
      <Table className={s.tableContainer}>
        <TableHead>
          <TableRow>
            <TableHeadCell className={classNames.tableHeadCell.name}>
              <Button
                className={classNames.tableHeadCell_btn.name}
                onClick={() => onChangeOrderBy('name')}
                variant={'link'}
              >
                Name
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.cardsCount}>
              <Button
                className={classNames.tableHeadCell_btn.cardsCount}
                onClick={() => onChangeOrderBy('cardsCount')}
                variant={'link'}
              >
                Cards
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.updated}>
              <Button
                className={classNames.tableHeadCell_btn.updated}
                onClick={() => onChangeOrderBy('updated')}
                variant={'link'}
              >
                Last updated
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.authorName}>
              <Button
                className={classNames.tableHeadCell_btn.authorName}
                onClick={() => onChangeOrderBy('author.name')}
                variant={'link'}
              >
                Author
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.actions}>Actions</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {decks?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>
                <Link className={s.tableImTitleWrapper} to={deck.id}>
                  {deck.cover && <img alt={'cover'} className={s.deckCoverImg} src={deck.cover} />}
                  <Typography className={s.deckTitle} variant={'sub2'}>
                    <span>{deck.name}</span>
                  </Typography>
                </Link>
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.cardsCount}</TableCell>
              <TableCell className={s.deckPointer}>
                {new Date(deck.updated).toLocaleDateString('ru-ru')}
              </TableCell>
              <TableCell className={s.deckPointer}>{deck.author.name}</TableCell>
              <TableCell>
                <div className={s.iconsContainer}>
                  <Button
                    as={deck.cardsCount === 0 ? 'button' : Link}
                    className={deck.cardsCount === 0 ? s.disableIcon : ''}
                    disabled={deck.cardsCount === 0}
                    to={`${deck.id}/learn`}
                    variant={'icon'}
                  >
                    <PlayCircleOutline
                      className={clsx(deck.cardsCount === 0 && s.disableIcon)}
                      height={'16px'}
                      width={'16px'}
                    />
                  </Button>
                  {isOwner(deck.userId) && (
                    <>
                      <UpdateDeck
                        deck={deck}
                        trigger={
                          <Button as={'div'} variant={'icon'}>
                            <Edit2Outline height={16} width={16} />
                          </Button>
                        }
                      />
                      <DeleteForm
                        id={deck.id}
                        name={deck.name}
                        onDeleteDeck={onDeleteDeck}
                        trigger={
                          <Button as={'div'} disabled={isDeckBeingDeleted} variant={'icon'}>
                            <TrashOutline
                              className={classNames.disabledIcon}
                              height={'16px'}
                              width={'16px'}
                            />
                          </Button>
                        }
                      />
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
