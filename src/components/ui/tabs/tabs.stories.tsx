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
  { content: 'Content1', title: 'Switcher1' },
  { content: 'Content2', title: 'Switcher2' },
  {
    content: (
      <div>
        <RadioGroup options={options} />
      </div>
    ),
    title: 'Switcher3',
  },
]

export const TabsDefault: Story = {
  argTypes: {},
  args: { tabs },
  render: () => {
    return <Tabs tabs={tabs} />
  },
}
