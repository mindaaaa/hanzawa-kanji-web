import Choice from './Choice.jsx';

export default {
  title: 'Components/Choice',
  component: Choice,
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'picked', 'correct', 'wrong', 'faded'],
    },
  },
  decorators: [(Story) => <div style={{ width: 360 }}>{Story()}</div>],
};

export const Idle = { args: { state: 'idle', letter: 'A', children: '사랑 / 애' } };
export const Picked = { args: { state: 'picked', letter: 'B', children: '사랑 / 애' } };
export const Correct = { args: { state: 'correct', letter: 'C', children: '사랑 / 애' } };
export const Wrong = { args: { state: 'wrong', letter: 'A', children: '걷다 / 보' } };
export const Faded = { args: { state: 'faded', letter: 'D', children: '앉다 / 좌' } };

export const RevealedSet = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, width: 360 }}>
      <Choice state='wrong' letter='A'>걷다 / 보</Choice>
      <Choice state='correct' letter='B'>사랑 / 애</Choice>
      <Choice state='faded' letter='C'>노래하다 / 가</Choice>
      <Choice state='faded' letter='D'>앉다 / 좌</Choice>
    </div>
  ),
};
