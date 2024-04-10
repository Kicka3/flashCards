import type { Meta, StoryObj } from '@storybook/react'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './table'

const meta = {
  argTypes: {},
  component: Table,
  tags: ['autodocs'],
  title: 'Components/Table',
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const TableDefault: Story = {
  args: {},
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Cards</TableHeadCell>
          <TableHeadCell>LastUpdate</TableHeadCell>
          <TableHeadCell>Created By</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>PackName</TableCell>
          <TableCell>4</TableCell>
          <TableCell>18/06/2022</TableCell>
          <TableCell>Ivan Pom</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>PackName</TableCell>
          <TableCell>4</TableCell>
          <TableCell>18/06/2022</TableCell>
          <TableCell>Ivan Pom</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
