import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import ArrowBackOutline from '@/assets/icons/components/ArrowBackOutline'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import noImg from '@/assets/img/no-photo.png'
import { useDebounce } from '@/common/hooks/useDebounce'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Pagination } from '@/common/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { TextField } from '@/common/ui/textField'
import { CreateCard } from '@/pages/сards/createCard'
import { Card, useDeleteCardMutation, useGetCardsQuery } from '@/services/cards'
import { IconDropDown } from '@/widgets/header/ui/icon-dropdown/iconDropdown'
import clsx from 'clsx'

import s from './cards.module.scss'

type Props = {}

export const Cards = ({}: Props) => {
  const { id } = useParams()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const [orderBy, setOrderBy] = useState('')
  const debouncedSearch = useDebounce(search)
  const paginationOptions = ['10', '20', '30', '50', '100']
  const [deleteCard, {}] = useDeleteCardMutation()
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id || '',
    params: {
      answer: debouncedSearch,
      currentPage,
      itemsPerPage: Number(itemsPerPage),
      orderBy: orderBy,
      question: debouncedSearch,
    },
  })
  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
  // const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
  const totalItems = cards?.pagination.totalItems

  /* удалить когда появиться картика DeckImg */
  const imgDeckSrc = ''

  if (isLoading) {
    return <div>...Loading</div>
  }

  const onChangeOrderBy = (columnName: string) => {
    let newOrder = 'asc'

    if (orderBy === `${columnName}-${newOrder}`) {
      newOrder = 'desc'
    }

    // нужна ли доп проверка
    //if (orderBy && orderBy.startsWith(columnName)) {
    //   newOrder = orderBy.endsWith('asc') ? 'desc' : 'asc';
    // }

    setOrderBy(`${columnName}-${newOrder}`)

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
      <CreateCard
        id={id}
        isOpen={isOpenCreate}
        onOpenChange={setIsOpenCreate}
        title={'Add New Deck'}
      />
      <Link className={s.backLink} to={'/'}>
        <ArrowBackOutline height={16} width={16} />
        <Typography variant={'body2'}>Back to Decks List</Typography>
      </Link>
      <div className={s.packIntro}>
        <div className={s.packTitle}>
          <Typography variant={'h1'}>Deck Name</Typography>
          <IconDropDown />
          {imgDeckSrc ?? <img src={imgDeckSrc} />}
        </div>
        <Button onClick={() => setIsOpenCreate(true)}>Add New Card</Button>
      </div>
      <div className={s.searchField}>
        <TextField onChange={setSearch} value={search} variant={'search'} />
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
            <TableHeadCell></TableHeadCell>
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
                    src={card.questionImg ? card.questionImg : noImg}
                    width={70}
                  />
                  {card.answer}
                </div>
              </TableCell>
              <TableCell>
                {new Intl.DateTimeFormat('ru-RU').format(new Date(card.updated))}
              </TableCell>
              <TableCell>{card.grade}</TableCell>
              <TableCell>
                <div className={s.btnWrapper}>
                  <Button variant={'icon'}>
                    <Edit2Outline height={16} width={16} />
                  </Button>
                  <Button onClick={() => deleteCard(card.id)} variant={'icon'}>
                    <TrashOutline height={16} width={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
    </section>
  )
}
