import { useState } from 'react'

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState('10')
  const paginationOptions = ['10', '20', '30', '50', '100']

  return {
    currentPage,
    itemsPerPage,
    paginationOptions,
    setCurrentPage,
    setItemsPerPage,
  }
}
