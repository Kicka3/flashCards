import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from '.'

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const PaginationDefault: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onChange: () => {},
    totalCount: 100,
  },
  /** Ругается на etTotalCount is declared but its value is never read */
  render: () => {
    const [totalCount] = useState(100)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const onChangePagination = (newPage: number, newCount: number) => {
      setCurrentPage(newPage)
      setItemsPerPage(newCount)
    }

    return (
      <>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onChange={onChangePagination}
          totalCount={totalCount}
        />
      </>
    )
  },
}
