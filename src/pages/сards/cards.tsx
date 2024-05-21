import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { useDebounce } from '@/common/hooks/useDebounce'
import { useFilter } from '@/common/hooks/useFilter'
import { GoBackButton } from '@/common/ui/backButton'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Rating } from '@/common/ui/rating'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { TextField } from '@/common/ui/textField'
import { UpdateCard } from '@/features/cards/updateCard'
import { Card, useDeleteCardMutation, useGetCardsQuery } from '@/services/cards'
import { useGetDeckByIdQuery } from '@/services/decks'
import clsx from 'clsx'

import s from './cards.module.scss'

import { PackIntro } from './packIntro/packIntro'

export const Cards = () => {
  const { id: deckId } = useParams()
  const { currentPage, itemsPerPage, me, paginationOptions, setCurrentPage, setItemsPerPage } =
    useFilter()

  const [search, setSearch] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const debouncedSearch = useDebounce(search)
  const { data: cards } = useGetCardsQuery({
    id: deckId || '',
    params: {
      currentPage,
      itemsPerPage: Number(itemsPerPage),
      orderBy: orderBy,
      question: debouncedSearch,
    },
  })
  const { data: deck } = useGetDeckByIdQuery(deckId!)
  const [deleteCard] = useDeleteCardMutation()

  const isOwner = deck?.userId === me?.id
  const isEmpty = Boolean(deck?.cardsCount)

  const totalItems = cards?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / 10 > 1

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
    tableHeadCell_btn: {
      answer: clsx(s.answer, s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'answer-asc',
        [s.desc]: orderBy === 'answer-desc',
      }),
      grade: clsx(s.grade, s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'grade-asc',
        [s.desc]: orderBy === 'grade-desc',
      }),
      question: clsx(s.question, s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'question-asc',
        [s.desc]: orderBy === 'question-desc',
      }),
      updated: clsx(s.updated, s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'updated-asc',
        [s.desc]: orderBy === 'updated-desc',
      }),
    },
  }

  return (
    <section className={s.wrapper}>
      <GoBackButton className={s.backBtn} />
      <PackIntro deck={deck} isEmpty={isEmpty} isOwner={isOwner} />

      {Boolean(isEmpty) && (
        <>
          <div className={s.searchField}>
            <TextField
              onChange={setSearch}
              placeholder={'Search by question...'}
              value={search}
              variant={'search'}
            />
          </div>

          <Table className={s.cardsTable}>
            <TableHead>
              <TableRow>
                <TableHeadCell className={s.tableHeadCell}>
                  <Button
                    className={classNames.tableHeadCell_btn.question}
                    onClick={() => onChangeOrderBy('question')}
                    variant={'link'}
                  >
                    Question
                  </Button>
                </TableHeadCell>
                <TableHeadCell className={s.tableHeadCell}>
                  <Button
                    className={classNames.tableHeadCell_btn.answer}
                    onClick={() => onChangeOrderBy('answer')}
                    variant={'link'}
                  >
                    Answer
                  </Button>
                </TableHeadCell>
                <TableHeadCell className={s.tableHeadCell}>
                  <Button
                    className={classNames.tableHeadCell_btn.updated}
                    onClick={() => onChangeOrderBy('updated')}
                    variant={'link'}
                  >
                    Last Updated
                  </Button>
                </TableHeadCell>
                <TableHeadCell className={s.tableHeadCell} onClick={() => onChangeOrderBy('grade')}>
                  <Button
                    className={classNames.tableHeadCell_btn.grade}
                    onClick={() => onChangeOrderBy('grade')}
                    variant={'link'}
                  >
                    Grade
                  </Button>
                </TableHeadCell>
                {isOwner && <TableHeadCell></TableHeadCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards?.items.map((card: Card) => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div className={s.contentWrapper}>
                      {card.questionImg && (
                        <img
                          alt={'deck image'}
                          className={s.cardImg}
                          height={50}
                          src={card.questionImg}
                          width={50}
                        />
                      )}

                      {card.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={s.contentWrapper}>
                      {card.answerImg && (
                        <img
                          alt={'card image'}
                          className={s.cardImg}
                          height={50}
                          src={card.answerImg}
                          width={70}
                        />
                      )}

                      {card.answer}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('ru-RU').format(new Date(card.updated))}
                  </TableCell>
                  <TableCell>
                    <Rating rating={card.grade} />
                  </TableCell>
                  {isOwner && (
                    <TableCell>
                      <div className={s.btnWrapper}>
                        <UpdateCard
                          card={card}
                          title={'Update Card'}
                          trigger={
                            <Button as={'div'} variant={'icon'}>
                              <Edit2Outline height={16} width={16} />
                            </Button>
                          }
                        />

                        <Button onClick={() => deleteCard(card.id)} variant={'icon'}>
                          <TrashOutline height={16} width={16} />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {moreThanOnePage && (
            <Pagination
              className={s.pagination}
              currentPage={currentPage}
              defaultValue={paginationOptions[0]}
              itemsPerPage={Number(itemsPerPage)}
              onChangeItemsPerPage={setItemsPerPage}
              onChangePage={setCurrentPage}
              options={paginationOptions}
              totalCount={totalItems || 0}
            />
          )}
        </>
      )}
    </section>
  )
}
