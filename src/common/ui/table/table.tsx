import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './table.module.scss'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.table, className)

    return <table className={computedClass} ref={ref} {...rest} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.thead, className)

    return <thead className={computedClass} ref={ref} {...rest} />
  }
)

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.tbody, className)

    return <tbody className={computedClass} ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.tr, className)

    return <tr className={computedClass} ref={ref} {...rest} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.th, className)

    return <th className={computedClass} ref={ref} {...rest} />
  }
)

export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const computedClass = clsx(s.td, className)

    return <td className={computedClass} ref={ref} {...rest} />
  }
)
