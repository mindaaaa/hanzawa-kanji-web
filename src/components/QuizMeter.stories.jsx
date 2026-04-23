import QuizMeter from './QuizMeter.jsx';

export default {
  title: 'Components/QuizMeter',
  component: QuizMeter,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  decorators: [(Story) => <div style={{ height: 320, display: 'flex' }}>{Story()}</div>],
};

export const Low = { args: { value: 20, label: '정답률' } };
export const Mid = { args: { value: 55, label: '정답률' } };
export const High = { args: { value: 85, label: '정답률' } };
export const Full = { args: { value: 100, label: '정답률' } };
export const Empty = { args: { value: 0, label: '정답률' } };
