import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '.'
import { RadioGroup } from '../radioGroup'

const meta = {
  component: Tabs,
  tags: ['autodocs'],
  title: 'Components/Tabs',
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const options = ['radio1', 'radio2', 'radio3']

const tabs = [
  { content: 'Content1', disabled: false, title: 'Switcher1' },
  { content: 'Content2', disabled: false, title: 'Switcher2' },
  {
    content: (
      <div>
        <RadioGroup options={options} />
      </div>
    ),
    disabled: false,
    title: 'Switcher3',
  },
]

export const TabsDefault: Story = {
  argTypes: {},
  args: { tabs },
  render: () => {
    return (
      <Tabs
        tabs={tabs.map(i => ({
          content: '',
          disabled: false,
          title: i.title,
        }))}
      />
    )
  },
}
export const TabsWithContent: Story = {
  argTypes: {},
  args: { tabs },
  render: () => {
    return <Tabs tabs={tabs} />
  },
}
export const TabsDisabled: Story = {
  argTypes: {},
  args: { tabs },
  render: () => {
    const disabledFirstTab = tabs.map((i, index) =>
      index === 0 ? { content: 'Content1', disabled: true, title: 'Switcher1' } : i
    )

    return <Tabs tabs={disabledFirstTab} />
  },
}
