import KanjiCell from './KanjiCell.jsx';

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
  title: 'Components/KanjiCell',
  component: KanjiCell,
  tags: ['autodocs'],
  argTypes: {
    flipped: { control: 'boolean' },
    displayNumber: { control: 'number' },
  },
  decorators: [(Story) => <div style={{ width: 130, height: 130 }}>{Story()}</div>],
};

export const Default = { args: { kanji: SAMPLES.ai, displayNumber: 1 } };
export const Flipped = { args: { kanji: SAMPLES.aku, displayNumber: 42, flipped: true } };
export const FlippedMultipleReadings = {
  args: { kanji: SAMPLES.tobu, displayNumber: 701, flipped: true },
};

export const Row = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 120px)', gap: 4, width: 'auto' }}>
      {[SAMPLES.ai, SAMPLES.aku, SAMPLES.tobu, SAMPLES.ai, SAMPLES.aku, SAMPLES.tobu].map((k, i) => (
        <div key={i} style={{ width: 120, height: 120 }}>
          <KanjiCell kanji={k} flipped={i === 3} />
        </div>
      ))}
    </div>
  ),
};
