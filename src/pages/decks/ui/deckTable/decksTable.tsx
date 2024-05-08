import { useMemo, useState } from 'react'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui'
import { Button } from '@/common/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
import { DeleteForm } from '@/features/deck/deleteForm'
import { Sort } from '@/services/common.types'
import clsx from 'clsx'

import s from './decksTable.module.scss'

/** Вынести отсюда???? */
export type Deck = {
  cards: number
  createdBy: string
  id: string
  lastUpdated: string
  name: string
}

type Props = {
  decks: Deck[] | undefined
  isOwner: boolean
  onDeleteClick?: (id: string) => void
  onEditClick?: (id: string) => void
  onSort?: (sort: Sort) => void
  sort?: Sort
}

export const DecksTable = ({ decks, onDeleteClick, onEditClick, onSort, sort }: Props) => {
  const [deleteForm, setDeleteForm] = useState(false)
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

  /** !!!! Ищу нужную колоду чтобы достать name !!!! */
  const deckWillDelete = decks?.find(d => d.id === IdDeletedDeck)

  /** ---------------------------------------*/

  /** Создаем итоговый класс */
  const classNames = {
    arrow: clsx(s.arrow, sort?.direction === 'asc' && s.arrowUp),
  }
  // Функция для обработки сортировки при нажатии на заголовок столбца
  const handleSort = (columnName: string) => {
    if (!onSort) {
      return
    }

    if (sort?.key !== columnName) {
      onSort({ direction: 'asc', key: columnName })
    } else if (sort.direction === 'asc') {
      onSort({ direction: 'desc', key: columnName })
    } else {
      onSort(null)
    }
  }

  // Функция для сортировки массива decks
  const sortedDecks = useMemo(() => {
    if (!decks || !sort) {
      return decks
    }

    //Переделать
    return [...decks].sort((a, b) => {
      if (a[sort.key] < b[sort.key]) {
        return sort.direction === 'asc' ? -1 : 1
      }
      if (a[sort.key] > b[sort.key]) {
        return sort.direction === 'asc' ? 1 : -1
      }

      return null
    })
  }, [decks, sort])

  /** ---------------------------------------*/
  const sortDirection = sort?.key === 'name' && (
    <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
  )

  const renderSortArrow = (key: string) => {
    if (sort?.key === key) {
      return <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
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
            <TableHeadCell className={classNames.arrow} onClick={() => handleSort('name')}>
              Name
              {renderSortArrow('name')}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('cardsCount')}>
              Cards {renderSortArrow('cardsCount')}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('updated')}>
              Last updated {renderSortArrow('updated')}
            </TableHeadCell>
            <TableHeadCell onClick={() => handleSort('author.name')}>
              Author {renderSortArrow('author.name')}
            </TableHeadCell>
            <TableHeadCell>Actions {sortDirection}</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDecks?.map(deck => (
            <TableRow key={deck.id}>
              <TableCell>
                <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
                  {deck.name}
                </Typography>
              </TableCell>
              <TableCell>{deck.cards}</TableCell>
              <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
              <TableCell>{deck.createdBy}</TableCell>
              <TableCell>
                <div className={s.iconsContainer}>
                  {/*//Исправить пути!*/}
                  <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
                    <PlayCircleOutline height={'16px'} width={'16px'} />
                  </Button>
                  <Button onClick={handleEditeClick(deck.id)} variant={'icon'}>
                    <Edit2Outline height={'16px'} width={'16px'} />
                  </Button>
                  <Button onClick={clickDeleteHandler(deck.id)} variant={'icon'}>
                    <TrashOutline height={'16px'} width={'16px'} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

//РАБОЧАЯ НО ООШИБКИ В КОНСОЛИ
// import { useMemo, useState } from 'react'
//
// import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
// import { Typography } from '@/common/ui'
// import { Button } from '@/common/ui/button'
// import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from '@/common/ui/table'
// import { DeleteForm } from '@/features/deck/deleteForm'
// import { Sort } from '@/services/common.types'
// import clsx from 'clsx'
//
// import s from './decksTable.module.scss'
//
// /** Вынести отсюда???? */
// export type Deck = {
//   cards: number
//   createdBy: string
//   id: string
//   lastUpdated: string
//   name: string
// }
//
// type Props = {
//   decks: Deck[] | undefined
//   isOwner: boolean
//   onDeleteClick?: (id: string) => void
//   onEditClick?: (id: string) => void
//   onSort?: (sort: Sort) => void
//   sort?: Sort
// }
//
// export const DecksTable = ({ decks, onDeleteClick, onEditClick, onSort, sort }: Props) => {
//   const [deleteForm, setDeleteForm] = useState(false)
//   /** Сохраняю ID колоды */
//   const [IdDeletedDeck, setIdDeletedDeck] = useState<string | undefined>('')
//
//   const handleEditeClick = (id: string) => () => onEditClick?.(id)
//
//   const closeDeleteFormHandler = () => {
//     setDeleteForm(false)
//   }
//
//   /** Удаляю по id из form*/
//   const onDeleteDeck = (id: string) => {
//     if (id) {
//       onDeleteClick?.(id)
//     }
//   }
//   /** Нажатие на иконку */
//   const clickDeleteHandler = (id: string) => () => {
//     setIdDeletedDeck(id)
//     setDeleteForm(true)
//   }
//
//   /** !!!! Ищу нужную колоду чтобы достать name !!!! */
//   const deckWillDelete = decks?.find(d => d.id === IdDeletedDeck)
//
//   const [orderBy, setOrderBy] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//
//   /** Создаем итоговый класс */
//   const classNames = {
//     arrow: clsx(s.arrow, sort?.direction === 'asc' && s.arrowUp),
//   }
//   // Функция для обработки сортировки при нажатии на заголовок столбца
//   const handleSort = (columnName: string) => {
//     if (!onSort) {
//       return
//     }
//
//     if (sort?.key !== columnName) {
//       onSort({ direction: 'asc', key: columnName })
//     } else if (sort.direction === 'asc') {
//       onSort({ direction: 'desc', key: columnName })
//     } else {
//       onSort(null)
//     }
//   }
//
//   // Функция для сортировки массива decks
//   const sortedDecks = useMemo(() => {
//     if (!decks || !sort) {
//       return decks
//     }
//
//     return [...decks].sort((a, b) => {
//       if (a[sort.key] < b[sort.key]) {
//         return sort.direction === 'asc' ? -1 : 1
//       }
//       if (a[sort.key] > b[sort.key]) {
//         return sort.direction === 'asc' ? 1 : -1
//       }
//
//       return null
//     })
//   }, [decks, sort])
//
//   return (
//     <>
//       <Table className={s.tableContainer}>
//         <TableHead>
//           <TableRow>
//             <TableHeadCell onClick={() => handleSort('name')}>
//               Name
//               {sort?.key === 'name' && (
//                 <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </TableHeadCell>
//             <TableHeadCell onClick={() => handleSort('cards')}>
//               Cards
//               {sort?.key === 'cards' && (
//                 <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </TableHeadCell>
//             <TableHeadCell onClick={() => handleSort('lastUpdated')}>
//               Last updated
//               {sort?.key === 'lastUpdated' && (
//                 <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </TableHeadCell>
//             <TableHeadCell onClick={() => handleSort('createdBy')}>
//               Author
//               {sort?.key === 'createdBy' && (
//                 <span className={classNames.arrow}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
//               )}
//             </TableHeadCell>
//             {/* ... (остальный код) */}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {sortedDecks?.map(deck => (
//             <TableRow key={deck.id}>
//               <TableCell>
//                 <Typography as={'a'} href={`/decks/${deck.id}`} variant={'body2'}>
//                   {deck.name}
//                 </Typography>
//               </TableCell>
//               <TableCell>{deck.cards}</TableCell>
//               <TableCell>{new Date(deck.lastUpdated).toLocaleString('ru-ru')}</TableCell>
//               <TableCell>{deck.createdBy}</TableCell>
//               <TableCell>
//                 <div className={s.iconsContainer}>
//                   {/*//Исправить пути!*/}
//                   <Button as={'a'} href={`/decks/${deck.id}/learn`} variant={'icon'}>
//                     <PlayCircleOutline height={'16px'} width={'16px'} />
//                   </Button>
//                   <Button onClick={handleEditeClick(deck.id)} variant={'icon'}>
//                     <Edit2Outline height={'16px'} width={'16px'} />
//                   </Button>
//                   <Button onClick={clickDeleteHandler(deck.id)} variant={'icon'}>
//                     <TrashOutline height={'16px'} width={'16px'} />
//                   </Button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </>
//   )
// }
