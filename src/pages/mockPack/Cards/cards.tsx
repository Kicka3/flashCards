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
import { IconDropDown } from '@/layout/header/ui/icon-dropdown/iconDropdown'
import { Card, useGetCardsQuery } from '@/services/cards'

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
  const { data: cards, isLoading } = useGetCardsQuery({
    id: id || '',
    params: {
      answer: debouncedSearch,
      currentPage,
      itemsPerPage: Number(itemsPerPage),
      question: debouncedSearch,
    },
  })
  const totalItems = cards?.pagination.totalItems

  /* удалить когда появиться картика DeckImg */
  const imgDeckSrc = ''

  if (isLoading) {
    return <div>...Loading</div>
  }

  return (
    <section className={s.wrapper}>
      <Link className={s.backLink} to={'/'}>
        <ArrowBackOutline height={16} width={16} />
        <Typography variant={'body2'}>Back to Decks List</Typography>
      </Link>
      <div className={s.deckIntro}>
        <div className={s.deckTitle}>
          <Typography variant={'h1'}>Deck Name</Typography>
          <IconDropDown />
          {imgDeckSrc ?? <img src={imgDeckSrc} />}
        </div>
        <Button>Add New Card</Button>
      </div>
      <div className={s.searchField}>
        <TextField onChange={setSearch} value={search} variant={'search'} />
      </div>

      <Table className={s.deckTable}>
        <TableHead>
          <TableRow>
            <TableHeadCell>Question</TableHeadCell>
            <TableHeadCell>Answer</TableHeadCell>
            <TableHeadCell>Last Updated</TableHeadCell>
            <TableHeadCell>Grade</TableHeadCell>
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
                  <Button variant={'icon'}>
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
