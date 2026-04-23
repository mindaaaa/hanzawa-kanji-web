import Button from './Button.jsx';

export default {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'yellow', 'blue', 'ghost'],
    },
    disabled: { control: 'boolean' },
  },
};

export const Primary = {
  args: { children: '정답 보기 ✦', variant: 'primary' },
};

export const Yellow = {
  args: { children: '다음 문제 →', variant: 'yellow' },
};

export const Blue = {
  args: { children: '다시 도전 →', variant: 'blue' },
};

export const Ghost = {
  args: { children: '처음으로 ✦', variant: 'ghost' },
};

export const Disabled = {
  args: { children: '다음 문제 →', disabled: true },
};
