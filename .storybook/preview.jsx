import { MemoryRouter } from 'react-router-dom';
import '../src/styles/fonts.css';
import '../src/styles/tokens.css';
import '../src/styles/global.css';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#f5ecd4' },
        { name: 'paper-hi', value: '#fbf5e1' },
        { name: 'ink', value: '#1a1a1a' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, { parameters }) => (
      <MemoryRouter initialEntries={[parameters.route ?? '/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
