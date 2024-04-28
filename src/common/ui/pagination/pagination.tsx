import { ComponentPropsWithoutRef } from 'react'

import { ArrowForwardOutline } from '@/assets/icons/components'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Typography } from '..'
import { Select } from '../select'

export type Props = {
  currentPage: number
  itemsPerPage: number
  onChange: (page: number, count: number) => void
  onValueChange: () => void
  options?: string[]
  totalCount: number
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>

export const Pagination = ({
  className,
  currentPage,
  itemsPerPage,
  onChange,
  onValueChange,
  options,
  totalCount,
}: Props) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage)

  const onChangeCallback = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onChange(page, itemsPerPage)
    }
  }

  const classNames = { pagination: clsx(s.pagination, className) }

  const renderPageNumbers = () => {
    /** страницы выводятся путем добавления в массив */
    const pageNumbers = []
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, startPage + 2)

    /** 1-ая страница */
    if (startPage > 1) {
      pageNumbers.push(
        <button className={s.page} key={1} onClick={() => onChangeCallback(1)}>
          <Typography as={'span'} variant={'body2'}>
            {1}
          </Typography>
        </button>
      )
      /** если стартовая страница больше 2, то вторым в массив попадает ...*/
      if (startPage > 2) {
        pageNumbers.push(
          <button className={s.page} disabled key={'startEllipsis'}>
            <Typography as={'span'} variant={'body2'}>
              ...
            </Typography>
          </button>
        )
      }
    }
    /** далее в массив попадает 3 значения: текущая страница + та, что перед ней + та, что после неё */
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          className={`${s.page} ${currentPage === i ? s.active : ''}`}
          key={i}
          onClick={() => onChangeCallback(i)}
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
          <button className={s.page} disabled key={'endEllipsis'}>
            <Typography as={'span'} variant={'body2'}>
              ...
            </Typography>
          </button>
        )
      }
      /** и в конце последняя страница */
      pageNumbers.push(
        <button className={s.page} key={totalPages} onClick={() => onChangeCallback(totalPages)}>
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
      <button className={s.arrowBack} onClick={() => onChangeCallback(currentPage - 1)}>
        <ArrowForwardOutline />
      </button>
      {renderPageNumbers()}
      <button className={s.arrowForward} onClick={() => onChangeCallback(currentPage + 1)}>
        <ArrowForwardOutline />
      </button>

      {options?.length && (
        <div className={s.selectWrapper}>
          <Typography as={'span'} variant={'body2'}>
            показать
          </Typography>

          <Select
            className={s.select}
            defaultValue={options[0]}
            onValueChange={onValueChange}
            options={options}
          />

          <Typography as={'span'} variant={'body2'}>
            на странице
          </Typography>
        </div>
      )}
    </div>
  )
}
