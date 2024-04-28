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

const options = ['10', '20', '30', '50', '100']
const totalCount = 1000

export const PaginationDefault: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onChangeItemsPerPage: () => {},
    onChangePage: () => {},
    options: options,
    totalCount: totalCount,
  },
  render: () => {
    const [itemsPerPage, setItemsPerPage] = useState('10')
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={Number(itemsPerPage)}
        onChangeItemsPerPage={setItemsPerPage}
        onChangePage={setCurrentPage}
        options={options}
        totalCount={totalCount}
      />
    )
  },
}
export const PaginationWithoutSelect: Story = {
  args: {
    currentPage: 1,
    itemsPerPage: 10,
    onChangeItemsPerPage: () => {},
    onChangePage: () => {},
    options: options,
    totalCount: totalCount,
  },
  render: () => {
    const [itemsPerPage, setItemsPerPage] = useState('10')
    const [currentPage, setCurrentPage] = useState(1)

    return (
      <Pagination
        currentPage={currentPage}
        itemsPerPage={Number(itemsPerPage)}
        onChangeItemsPerPage={setItemsPerPage}
        onChangePage={setCurrentPage}
        totalCount={totalCount}
      />
    )
  },
}
