import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark', // Set default background color to black
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
