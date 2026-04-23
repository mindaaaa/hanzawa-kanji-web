import LibraryGrid from './LibraryGrid.jsx';
import mockKanji from '../data/mockKanji.json';

export default {
  title: 'Components/LibraryGrid',
  component: LibraryGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, height: '80vh', background: '#f5ecd4' }}>{Story()}</div>
    ),
  ],
};

export const Small = {
  args: {
    items: mockKanji.slice(0, 30),
    hasMore: false,
    loading: false,
  },
};

export const LargeWithMore = {
  args: {
    items: mockKanji.slice(0, 200),
    hasMore: true,
    loading: false,
    onLoadMore: () => console.log('load more'),
  },
};

export const Empty = {
  args: { items: [], hasMore: false, loading: false },
};
