import type { Preview } from '@storybook/react'
import '../src/styles/index.scss'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import { initialize } from 'msw-storybook-addon'
import { handlers } from '../src/services/mocks/handlers'

initialize({}, handlers)

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'black', // Set default background color to black
      values: [
        {
          name: 'black',
          value: '#000',
        },
        {
          name: 'dark',
          value: '#333',
        },
        {
          name: 'white',
          value: '#fff',
        },
      ],
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
