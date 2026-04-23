import QuizMeta from './QuizMeta.jsx';

export default {
  title: 'Components/QuizMeta',
  component: QuizMeta,
  tags: ['autodocs'],
};

export const Limited = {
  args: {
    badge: '유한 모드',
    children: (
      <>
        문제 <b>7</b> / 20 · 맞은 <b>5</b>
      </>
    ),
  },
};

export const Infinite = {
  args: {
    badge: '∞ 무한 모드',
    children: (
      <>
        풀어본 <b>12</b> · 맞은 <b>9</b>
      </>
    ),
    onQuit: () => {},
  },
};
