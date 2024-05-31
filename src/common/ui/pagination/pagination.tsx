import { ComponentPropsWithoutRef } from 'react'

import { ArrowForwardOutline } from '@/assets/icons/components'
import { Typography } from '@/common/ui/typography'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select, SelectProps } from '../select'

type Props = {
  currentPage: number
  itemsPerPage: number
  onChangeItemsPerPage: (count: string) => void
  onChangePage: (page: number) => void
  options?: string[]
  totalCount: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> &
  SelectProps

export const Pagination = ({
  className,
  currentPage,
  itemsPerPage,
  onChangeItemsPerPage,
  onChangePage,
  options,
  totalCount,
  ...restProps
}: Props) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const onChangePageCallback = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onChangePage(page)
    }
  }

  const changeItemsPerPageHandler = (value: string) => {
    onChangeItemsPerPage(value)
    if (currentPage !== 1) {
      onChangePage(1)
    }
  }

  const classNames = {
    btnNextPage: clsx(s.arrowForward, { [s.disable]: currentPage === totalPages }),
    btnPrevPage: clsx(s.arrowBack, { [s.disable]: currentPage === 1 }),
    pagination: clsx(s.pagination, className),
  }

  const renderPageNumbers = () => {
    /** страницы выводятся путем добавления в массив */
    const pageNumbers = []
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, startPage + 2)

    /** 1-ая страница */
    if (startPage > 1) {
      pageNumbers.push(
        <button className={s.page} key={1} onClick={() => onChangePageCallback(1)}>
          <Typography as={'span'} variant={'body2'}>
            {1}
          </Typography>
        </button>
      )
      /** если стартовая страница больше 2, то вторым в массив попадает ...*/
      if (startPage > 2) {
        pageNumbers.push(
          <Typography as={'span'} variant={'body2'}>
            ...
          </Typography>
        )
      }
    }
    /** далее в массив попадает 3 значения: текущая страница + та, что перед ней + та, что после неё */
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          className={`${s.page} ${currentPage === i && s.active}`}
          key={i}
          onClick={() => onChangePageCallback(i)}
        >
          <Typography as={'span'} variant={'body2'}>
            {i}
          </Typography>
        </button>
      )
    }
    /** далее в массив "..." при условии, что это не последние страницы */
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <Typography as={'span'} variant={'body2'}>
            ...
          </Typography>
        )
      }
      /** и в конце последняя страница */
      pageNumbers.push(
        <button
          className={s.page}
          key={totalPages}
          onClick={() => onChangePageCallback(totalPages)}
        >
          <Typography as={'span'} variant={'body2'}>
            {totalPages}
          </Typography>
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className={classNames.pagination}>
      <button
        className={classNames.btnPrevPage}
        disabled={currentPage === 1}
        onClick={() => onChangePageCallback(currentPage - 1)}
      >
        <ArrowForwardOutline />
      </button>
      {renderPageNumbers()}
      <button
        className={classNames.btnNextPage}
        disabled={currentPage === totalPages}
        onClick={() => onChangePageCallback(currentPage + 1)}
      >
        <ArrowForwardOutline />
      </button>

      {options?.length && (
        <div className={s.selectWrapper}>
          <Typography as={'span'} variant={'body2'}>
            показать
          </Typography>

          <Select
            defaultValue={options[0]}
            onValueChange={changeItemsPerPageHandler}
            options={options}
            {...restProps}
          />

          <Typography as={'span'} variant={'body2'}>
            на странице
          </Typography>
        </div>
      )}
    </div>
  )
}
