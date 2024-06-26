import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Rating } from '@/common/ui/rating'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { TextField } from '@/common/ui/textField'
import { UpdateCard } from '@/features/cards/updateCard'
import { Card } from '@/services/cards'
import clsx from 'clsx'

import s from './cards.module.scss'

type Props = {
  cards: Card[]
  currentPage: number
  isOwner: boolean
  itemsPerPage: number
  moreThanOnePage: boolean
  onChangeItemsPerPage: (page: string) => void
  onChangeOrderBy: (columnName: string) => void
  onChangePage: (page: number) => void
  onChangeSearchField: (value: string) => void
  onDeleteCard: (id: string) => void
  orderBy: null | string
  paginationOptions: string[]
  searchField: string
  totalItems: number
}

export const Cards = ({
  cards,
  currentPage,
  isOwner,
  itemsPerPage,
  moreThanOnePage,
  onChangeItemsPerPage,
  onChangeOrderBy,
  onChangePage,
  onChangeSearchField,
  onDeleteCard,
  orderBy,
  paginationOptions,
  searchField,
  totalItems,
}: Props) => {
  const classNames = {
    tableHeadCell: {
      actions: clsx(s.actions, s.tableHeadCell),
      answer: clsx(s.answer, s.tableHeadCell),
      grade: clsx(s.grade, s.tableHeadCell),
      question: clsx(s.question, s.tableHeadCell),
      updated: clsx(s.updated, s.tableHeadCell),
    },
    tableHeadCell_btn: {
      answer: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'answer-asc',
        [s.desc]: orderBy === 'answer-desc',
      }),
      grade: clsx(s.tableHeadCell_btn, {
        [s.asc]: orderBy === 'grade-asc',
        [s.desc]: orderBy === 'grade-desc',
      }),
      question: clsx(s.tableHeadCell_btn, {
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
    <>
      <div className={s.searchField}>
        <TextField
          onChange={onChangeSearchField}
          placeholder={'Search by question...'}
          value={searchField}
          variant={'search'}
        />
      </div>

      <Table className={s.cardsTable}>
        <TableHead>
          <TableRow>
            <TableHeadCell className={classNames.tableHeadCell.question}>
              <Button
                className={classNames.tableHeadCell_btn.question}
                onClick={() => onChangeOrderBy('question')}
                variant={'link'}
              >
                Question
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.answer}>
              <Button
                className={classNames.tableHeadCell_btn.answer}
                onClick={() => onChangeOrderBy('answer')}
                variant={'link'}
              >
                Answer
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.updated}>
              <Button
                className={classNames.tableHeadCell_btn.updated}
                onClick={() => onChangeOrderBy('updated')}
                variant={'link'}
              >
                Last Updated
              </Button>
            </TableHeadCell>
            <TableHeadCell className={classNames.tableHeadCell.grade}>
              <Button
                className={classNames.tableHeadCell_btn.grade}
                onClick={() => onChangeOrderBy('grade')}
                variant={'link'}
              >
                Grade
              </Button>
            </TableHeadCell>
            {isOwner && (
              <TableHeadCell className={classNames.tableHeadCell.actions}></TableHeadCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card: Card) => (
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

                    <Button onClick={() => onDeleteCard(card.id)} variant={'icon'}>
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
          onChangeItemsPerPage={onChangeItemsPerPage}
          onChangePage={onChangePage}
          options={paginationOptions}
          totalCount={totalItems || 0}
        />
      )}
    </>
  )
}
