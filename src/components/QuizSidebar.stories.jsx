import QuizSidebar from './QuizSidebar.jsx';

export default {
  title: 'Components/QuizSidebar',
  component: QuizSidebar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['limited', 'infinite'] },
    highlight: { control: 'boolean' },
  },
  decorators: [(Story) => <div style={{ width: 320 }}>{Story()}</div>],
};

export const Limited = {
  args: {
    variant: 'limited',
    title: '✦ 진행중',
    current: 7,
    total: 20,
    progressPercent: 35,
    children: (
      <>
        <span>맞은 문제 5개</span>
        <span>남은 문제 13개</span>
      </>
    ),
  },
};

export const LimitedCorrect = {
  args: {
    ...Limited.args,
    highlight: true,
    title: '✦ 정답!',
    children: (
      <>
        <span>정답이에요!</span>
        <span>맞은 문제 6 / 7</span>
      </>
    ),
  },
};

export const Infinite = {
  args: {
    variant: 'infinite',
    title: '∞ 무한 모드',
    current: 42,
    children: (
      <>
        <span>풀어본 문제 42개</span>
        <span>맞은 문제 38개</span>
      </>
    ),
  },
};
