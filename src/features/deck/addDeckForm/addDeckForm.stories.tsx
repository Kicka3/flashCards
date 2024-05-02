import type { Meta, StoryObj } from '@storybook/react'

import { AddDeckForm } from '@/features/deck/addDeckForm/addDeckForm'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  args: {
    onOpenChange: fn(),
  },
  component: AddDeckForm,

  title: 'Feature/AddNewDeck',
} satisfies Meta<typeof AddDeckForm>

export default meta
type Story = StoryObj<typeof meta>

export const AddNewDeckForm: Story = {
  args: {
    isOpen: true,
    title: 'Add new deck',
  },
}
