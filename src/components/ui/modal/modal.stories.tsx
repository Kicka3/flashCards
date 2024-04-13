import type { Meta, StoryObj } from '@storybook/react'

import { Modal } from '@/components/ui/modal/modal'

const meta = {
  argTypes: {},
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWitchText: Story = {
  args: {
    onOpenChange: (open: boolean) => console.log('is open'),
    open: false,
    title: 'Title modal',
  },
}
