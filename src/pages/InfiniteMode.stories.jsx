import { InfiniteModeView } from './InfiniteMode.jsx';

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
  title: 'Pages/InfiniteMode',
  component: InfiniteModeView,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

const noop = () => {};

const baseArgs = {
  currentQuiz: SAMPLE,
  allChoices: CHOICES,
  handleAnswerClick: noop,
  handleShowAnswer: noop,
  handleNext: noop,
  handleEndQuiz: noop,
};

export const FreshStart = {
  args: {
    ...baseArgs,
    selectedAnswer: null,
    isCorrect: null,
    flipped: false,
    alertVisible: false,
    correctCount: 0,
    answeredCount: 0,
  },
};

export const Picked = {
  args: {
    ...baseArgs,
    selectedAnswer: CHOICES[0],
    isCorrect: null,
    flipped: false,
    alertVisible: false,
    correctCount: 9,
    answeredCount: 12,
  },
};

export const RevealedCorrect = {
  args: {
    ...baseArgs,
    selectedAnswer: CHOICES[0],
    isCorrect: true,
    flipped: true,
    alertVisible: false,
    correctCount: 10,
    answeredCount: 13,
  },
};

export const RevealedWrong = {
  args: {
    ...baseArgs,
    selectedAnswer: CHOICES[1],
    isCorrect: false,
    flipped: true,
    alertVisible: false,
    correctCount: 9,
    answeredCount: 13,
  },
};

export const LowAccuracy = {
  args: {
    ...baseArgs,
    selectedAnswer: null,
    isCorrect: null,
    flipped: false,
    alertVisible: false,
    correctCount: 3,
    answeredCount: 12,
  },
};

export const AlertShown = {
  args: {
    ...baseArgs,
    selectedAnswer: null,
    isCorrect: null,
    flipped: false,
    alertVisible: true,
    correctCount: 9,
    answeredCount: 12,
  },
};
