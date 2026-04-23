import { StudyModeView } from './StudyMode.jsx';
import mockKanji from '../data/mockKanji.json';
import { shuffle } from '../utils/shuffle.js';

export default {
  title: 'Pages/StudyMode',
  component: StudyModeView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const loaded120 = mockKanji.slice(0, 120);
const loading40 = mockKanji.slice(0, 40);
const all300 = mockKanji.slice(0, 300);

export const Loaded = {
  args: {
    items: loaded120,
    displayItems: loaded120,
    loading: false,
    hasMore: true,
    onLoadMore: () => console.log('load more'),
    sort: 'id',
    onSortChange: () => {},
  },
};

export const Loading = {
  args: {
    items: loading40,
    displayItems: loading40,
    loading: true,
    hasMore: true,
    onLoadMore: () => {},
    sort: 'id',
    onSortChange: () => {},
  },
};

export const AllLoaded = {
  args: {
    items: all300,
    displayItems: all300,
    loading: false,
    hasMore: false,
    onLoadMore: () => {},
    sort: 'id',
    onSortChange: () => {},
  },
};

export const RandomSort = {
  args: {
    items: loaded120,
    displayItems: shuffle(loaded120),
    loading: false,
    hasMore: true,
    onLoadMore: () => {},
    sort: 'random',
    onSortChange: () => {},
  },
};
