import ResultSummary from './ResultSummary.jsx';

export default {
  title: 'Components/ResultSummary',
  component: ResultSummary,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => <div style={{ padding: 40 }}>{Story()}</div>,
  ],
};

const base = {
  onHome: () => {},
  onRetry: () => {},
};

export const MidScore = {
  args: { ...base, total: 20, correct: 14 },
};

export const HighScore = {
  args: { ...base, total: 20, correct: 19 },
};

export const Perfect = {
  args: { ...base, total: 20, correct: 20 },
};

export const LowScore = {
  args: { ...base, total: 20, correct: 6 },
};

export const InfiniteResult = {
  args: { ...base, total: 42, correct: 38 },
};

export const HomeOnly = {
  args: { total: 20, correct: 17, onHome: () => {} },
};
