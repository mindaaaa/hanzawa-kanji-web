import { StudyModeView } from './StudyMode.jsx';
import mockKanji from '../data/mockKanji.json';

export default {
  title: 'Pages/StudyMode',
  component: StudyModeView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Loaded = {
  args: {
    items: mockKanji.slice(0, 120),
    loading: false,
    hasMore: true,
    onLoadMore: () => console.log('load more'),
    sort: 'id',
    onSortChange: () => {},
  },
};

export const Loading = {
  args: {
    items: mockKanji.slice(0, 40),
    loading: true,
    hasMore: true,
    onLoadMore: () => {},
    sort: 'id',
    onSortChange: () => {},
  },
};

export const AllLoaded = {
  args: {
    items: mockKanji.slice(0, 300),
    loading: false,
    hasMore: false,
    onLoadMore: () => {},
    sort: 'id',
    onSortChange: () => {},
  },
};

export const RandomSort = {
  args: {
    items: mockKanji.slice(0, 120),
    loading: false,
    hasMore: true,
    onLoadMore: () => {},
    sort: 'random',
    onSortChange: () => {},
  },
};
