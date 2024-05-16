import type { Meta, StoryObj } from '@storybook/react'

import { LogOut, TrashOutline } from '@/assets/icons/components'
import { fn } from '@storybook/test'

import { Button } from './button'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
  },
  args: {
    onClick: fn(),
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
    icon: <LogOut height={'24px'} width={'24px'} />,
    variant: 'primary',
  },
}

export const ButtonLikeIcon: Story = {
  args: {
    children: <TrashOutline height={'24px'} width={'24px'} />,
    disabled: false,
    variant: 'icon',
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
    icon: <LogOut height={'24px'} width={'24px'} />,
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

export const FullwidthWithIcon: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    icon: <LogOut height={'24px'} width={'24px'} />,
    variant: 'secondary',
  },
}

export const AsA: Story = {
  args: {
    as: 'a',
    children: 'a that looks like a button',
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'link',
  },
}
