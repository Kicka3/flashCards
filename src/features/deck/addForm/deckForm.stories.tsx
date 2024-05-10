import type { Meta, StoryObj } from '@storybook/react'

import { DeckForm } from '@/features/deck/addForm/deckForm'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {},
  args: {
    onOpenChange: fn(),
  },
  component: DeckForm,

  title: 'Feature/AddNewDeck',
} satisfies Meta<typeof DeckForm>

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
