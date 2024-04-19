import type { Meta, StoryObj } from '@storybook/react'

import { TextField } from '@/common/ui/textField/textField'
import { fn } from '@storybook/test'

const meta = {
  argTypes: {
    disabled: { control: 'boolean' },
    errorMessage: {
      control: 'text',
    },
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

export const DefaultInput: Story = {
  args: {
    disabled: false,
    label: 'DefaultInput',
    variant: 'default',
  },
}

export const InputWithError: Story = {
  args: {
    errorMessage: 'Error!',
    label: 'InputWithError',
    value: 'With Error',
    variant: 'default',
  },
}

export const DefaultInputDisabled: Story = {
  args: {
    disabled: true,
    label: 'Default input disabled',
    variant: 'default',
  },
}

export const InputPassword: Story = {
  args: {
    label: 'Password input',
    placeholder: 'Password input',
    value: 'Input Password',
    variant: 'password',
  },
}

export const InputPasswordError: Story = {
  args: {
    errorMessage: 'Some error!',
    label: 'Password error!',
    placeholder: 'Password input',
    value: 'Input Password',
    variant: 'password',
  },
}

export const InputPasswordDisabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled pass input',
    placeholder: 'Disabled password input',
    value: 'Disabled pass input',
    variant: 'password',
  },
}

export const InputSearch: Story = {
  args: {
    onClearClick: () => {},
    placeholder: 'Search input',
    value: 'Input for search',
    variant: 'search',
  },
}

export const InputSearchError: Story = {
  args: {
    errorMessage: 'Search error!',
    onClearClick: () => {},
    placeholder: 'Search error',
    value: 'Search error',
    variant: 'search',
  },
}

export const InputSearchDisabled: Story = {
  args: {
    disabled: true,
    onClearClick: () => {},
    placeholder: 'Search disabled',
    value: 'Search disabled',
    variant: 'search',
  },
}
