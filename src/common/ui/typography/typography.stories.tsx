import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/common/ui'

const meta = {
  argTypes: {
    variant: {
      options: [
        'body1',
        'body2',
        'caption',
        'captionLink',
        'error',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'link',
        'overline',
        'sub1',
        'sub2',
        'subLink',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography/Light',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const AllTypography: Story = {
  args: {},
  render: () => {
    return (
      <>
        <Typography variant={'h1'}>Heading 1</Typography>
        <Typography variant={'h2'}>Heading 2</Typography>
        <Typography variant={'h3'}>Heading 3</Typography>
        <Typography variant={'h4'}>Heading 4</Typography>
        <Typography variant={'sub1'}>Subtitle 1</Typography>
        <Typography variant={'sub2'}>Subtitle 2</Typography>
        <Typography variant={'body1'}>Body 1</Typography>
        <Typography variant={'body2'}>Body 2</Typography>
        <Typography variant={'overline'}>Overline</Typography>
        <Typography variant={'caption'}>Caption</Typography>
        <Typography variant={'link1'}>Link 1</Typography>
        <Typography variant={'link2'}>Link 2</Typography>
      </>
    )
  },
}

export const Heading1: Story = {
  args: {
    as: 'h1',
    children: 'Heading 1',
    variant: 'h1',
  },
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    children: 'Heading 2',
    variant: 'h2',
  },
}

export const Heading3: Story = {
  args: {
    as: 'h3',
    children: 'Heading 3',
    variant: 'h3',
  },
}

export const Body1: Story = {
  args: {
    as: 'p',
    children: 'Body 1',
    variant: 'body1',
  },
}

export const Body2: Story = {
  args: {
    as: 'p',
    children: 'Body 2',
    variant: 'body2',
  },
}

export const Link1: Story = {
  args: {
    as: 'a',
    children: 'Link 1',
    variant: 'link',
  },
}

export const Link2: Story = {
  args: {
    as: 'a',
    children: 'Link 2',
    variant: 'link',
  },
}

export const Sub1: Story = {
  args: {
    as: 'span',
    children: 'Sub 1',
    variant: 'sub1',
  },
}

export const Sub2: Story = {
  args: {
    as: 'span',
    children: 'Sub 2',
    variant: 'sub2',
  },
}

export const Caption: Story = {
  args: {
    as: 'span',
    children: 'Caption',
    variant: 'caption',
  },
}

export const CaptionLink: Story = {
  args: {
    as: 'a',
    children: 'Caption Link',
    variant: 'captionLink',
  },
}

export const Overline: Story = {
  args: {
    as: 'span',
    children: 'Overline',
    variant: 'overline',
  },
}

export const Error: Story = {
  args: {
    as: 'p',
    children: 'Error',
    variant: 'error',
  },
}
