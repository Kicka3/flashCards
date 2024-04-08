import type { Meta, StoryObj } from '@storybook/react'

import LogOut from '@/assets/icons/log-out'

import { Button } from './button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const DisabledPrimary: Story = {
  args: {
    children: 'Disabled Primary Button',
    disabled: true,
    variant: 'primary',
  },
}

export const PrimaryWithIcon: Story = {
  args: {
    children: 'Primary Button With Icon',
    disabled: false,
    icon: <LogOut />,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const DisabledSecondary: Story = {
  args: {
    children: 'Disabled Secondary Button',
    disabled: true,
    variant: 'secondary',
  },
}

export const SecondaryWithIcon: Story = {
  args: {
    children: 'Secondary Button With Icon',
    disabled: false,
    icon: <LogOut />,
    variant: 'secondary',
  },
}

export const Fullwidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}
