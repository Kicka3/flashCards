import type { Meta, StoryObj } from '@storybook/react'

import { AddForm } from '@/features/deck/addForm/addForm'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  args: {
    onOpenChange: fn(),
  },
  component: AddForm,

  title: 'Feature/AddNewDeck',
} satisfies Meta<typeof AddForm>

export default meta
type Story = StoryObj<typeof meta>

export const AddNewDeckForm: Story = {
  args: {
    isOpen: true,
    onOpenChange: fn(),
    onSubmitDeck: fn(),
    title: 'Add new deck',
  },
}
