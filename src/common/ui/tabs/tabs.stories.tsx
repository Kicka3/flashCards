import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '@/common/ui/tabs/tabs'

const meta = {
  argTypes: {
    tabs: {
      disabled: {
        control: { type: 'button' },
        options: [true, false],
      },
      title: {
        control: { type: 'button' },
        options: [''],
      },
      value: {
        control: { type: 'button' },
        options: [''],
      },
    },
  },
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const TabSwitcherDemo: Story = {
  args: {
    onTabValueChange: (value: string) => console.log(`Tab value changed to ${value}`),
    tabs: [
      { title: 'Hello', value: 'Hello' },
      { title: 'I am a', value: 'I am a' },
      { title: 'Tab-switcher', value: 'switcher' },
    ],
  },
}
