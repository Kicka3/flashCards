import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/components/ArrowBackOutline'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import noImg from '@/assets/img/noImage.png'
import { useDebounce } from '@/common/hooks/useDebounce'
import { useFilter } from '@/common/hooks/useFilter'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Rating } from '@/common/ui/rating'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { TextField } from '@/common/ui/textField'
import { Typography } from '@/common/ui/typography'
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
  const { data: cards, isLoading } = useGetCardsQuery({
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

  if (isLoading) {
    return <div>...Loading</div>
  }

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
    tableHeadCell: {
      answer: clsx(s.tableHeadCell, {
        [s.asc]: orderBy === 'answer-asc',
        [s.desc]: orderBy === 'answer-desc',
      }),
      grade: clsx(s.tableHeadCell, {
        [s.asc]: orderBy === 'grade-asc',
        [s.desc]: orderBy === 'grade-desc',
      }),
      question: clsx(s.tableHeadCell, {
        [s.asc]: orderBy === 'question-asc',
        [s.desc]: orderBy === 'question-desc',
      }),
      updated: clsx(s.tableHeadCell, {
        [s.asc]: orderBy === 'updated-asc',
        [s.desc]: orderBy === 'updated-desc',
      }),
    },
  }

  return (
    <section className={s.wrapper}>
      <Link className={s.backLink} to={'/'}>
        <ArrowBackOutline height={16} width={16} />
        <Typography variant={'sub1'}>Back to Decks List</Typography>
      </Link>

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
                <TableHeadCell
                  className={classNames.tableHeadCell.question}
                  onClick={() => onChangeOrderBy('question')}
                >
                  Question
                </TableHeadCell>
                <TableHeadCell
                  className={classNames.tableHeadCell.answer}
                  onClick={() => onChangeOrderBy('answer')}
                >
                  Answer
                </TableHeadCell>
                <TableHeadCell
                  className={classNames.tableHeadCell.updated}
                  onClick={() => onChangeOrderBy('updated')}
                >
                  Last Updated
                </TableHeadCell>
                <TableHeadCell
                  className={classNames.tableHeadCell.grade}
                  onClick={() => onChangeOrderBy('grade')}
                >
                  Grade
                </TableHeadCell>
                {isOwner && <TableHeadCell></TableHeadCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {cards?.items.map((card: Card) => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div className={s.contentWrapper}>
                      <img
                        className={s.cardImg}
                        height={50}
                        src={card.questionImg ? card.questionImg : noImg}
                        width={50}
                      />
                      {card.question}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={s.contentWrapper}>
                      <img
                        className={s.cardImg}
                        height={50}
                        src={card.answerImg ? card.answerImg : noImg}
                        width={70}
                      />
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
