import QuestionCard from './QuestionCard.jsx';

const SAMPLE = {
  id: 4,
  value: '愛',
  korean: [{ kun: '사랑', on: '애' }],
  kunyomi: [],
  onyomi: ['アイ'],
  traditionalForm: null,
};

const OTHERS = [
  { id: 1, value: '亜', korean: [{ kun: '버금', on: '아' }], kunyomi: [], onyomi: ['ア'], traditionalForm: '亞' },
  { id: 2, value: '哀', korean: [{ kun: '슬플', on: '애' }], kunyomi: ['あわ-れ'], onyomi: ['アイ'], traditionalForm: null },
  { id: 3, value: '握', korean: [{ kun: '쥘', on: '악' }], kunyomi: ['にぎ-る'], onyomi: ['アク'], traditionalForm: null },
];

const formatChoice = (kanji) => {
  const { kun, on } = kanji.korean[0];
  return { ...kanji, display: [`${kun} / ${on}`] };
};

const CHOICES = [SAMPLE, ...OTHERS].map(formatChoice);

export default {
  title: 'Components/QuestionCard',
  component: QuestionCard,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => <div style={{ padding: 32, maxWidth: 900 }}>{Story()}</div>,
  ],
};

const baseArgs = {
  currentQuiz: SAMPLE,
  allChoices: CHOICES,
  handleAnswerClick: () => {},
};

export const Pending = {
  args: {
    ...baseArgs,
    flipped: false,
    selectedAnswer: null,
    isCorrect: null,
  },
};

export const Picked = {
  args: {
    ...baseArgs,
    flipped: false,
    selectedAnswer: CHOICES[0],
    isCorrect: null,
  },
};

export const RevealedCorrect = {
  args: {
    ...baseArgs,
    flipped: true,
    selectedAnswer: CHOICES[0],
    isCorrect: true,
  },
};

export const RevealedWrong = {
  args: {
    ...baseArgs,
    flipped: true,
    selectedAnswer: CHOICES[1],
    isCorrect: false,
  },
};
