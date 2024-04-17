import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/common/ui/textField/textField'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    onClearClick: fn(),
    placeholder: { control: 'text' },
    value: { control: 'text' },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'search', 'password'],
    },
  },
  component: TextField,
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
    variant: 'default',
  },
}

export const DefaultWithError: Story = {
  args: {
    disabled: false,
    error: 'd',
    value: 'With Error',
  },
}

export const InputPassword: Story = {
  args: {
    placeholder: 'pass',
    value: 'Input Password',
    variant: 'password',
  },
}

export const InputDisable: Story = {
  args: {
    disabled: true,
    placeholder: 'pass',
    value: 'Input Disable',
    variant: 'password',
  },
}

export const InputSearch: Story = {
  args: {
    disabled: false,
    onClearClick: () => {},
    placeholder: 'dsd',
    value: 'Input for search',
    variant: 'search',
  },
}
