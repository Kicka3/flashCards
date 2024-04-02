import type { Meta, StoryObj } from '@storybook/react'
import {Typography} from "@/components/ui/typography/typography";



const meta = {
    argTypes: {
        variant: {
            control: { type: 'radio' },
            options: ['primary', 'secondary'],
        },
    },
    component: Typography,
    tags: ['autodocs'],
    title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: 'Primary Button',
        disabled: false,
        variant: 'primary',
    },
}
