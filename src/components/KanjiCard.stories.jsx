import KanjiCard from './KanjiCard.jsx';

const SAMPLES = {
  ai: {
    id: 4,
    value: '愛',
    korean: [{ kun: '사랑', on: '애' }],
    kunyomi: [],
    onyomi: ['アイ'],
    traditionalForm: null,
  },
  aku: {
    id: 6,
    value: '悪',
    korean: [{ kun: '악할', on: '악' }],
    kunyomi: ['わる-い'],
    onyomi: ['アク', 'オ'],
    traditionalForm: '惡',
  },
  tobu: {
    id: 701,
    value: '飛',
    korean: [{ kun: '날', on: '비' }],
    kunyomi: ['と-ぶ'],
    onyomi: ['ヒ'],
    traditionalForm: null,
  },
};

export default {
  title: 'Components/KanjiCard',
  component: KanjiCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['paper', 'blue', 'yellow', 'coral'],
    },
    flipped: { control: 'boolean' },
  },
  decorators: [
    (Story) => <div style={{ width: 260 }}>{Story()}</div>,
  ],
};

export const Paper = { args: { kanji: SAMPLES.ai, variant: 'paper' } };
export const Blue = { args: { kanji: SAMPLES.aku, variant: 'blue' } };
export const Yellow = { args: { kanji: SAMPLES.tobu, variant: 'yellow' } };
export const Coral = { args: { kanji: SAMPLES.ai, variant: 'coral' } };

export const Flipped = {
  args: { kanji: SAMPLES.aku, variant: 'paper', flipped: true },
};

export const WithBackContent = {
  args: {
    kanji: SAMPLES.tobu,
    variant: 'coral',
    flipped: true,
    backContent: (
      <div style={{ textAlign: 'center', fontFamily: 'Caveat, cursive', fontSize: 28, color: '#e2513c' }}>
        ✦ 커스텀 뒷면 ✦
      </div>
    ),
  },
};
