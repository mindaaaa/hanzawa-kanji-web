import Card from './Card.jsx';

export default {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['paper', 'blue', 'yellow', 'coral'],
    },
    shadow: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'accent'],
    },
  },
};

export const Paper = {
  args: { variant: 'paper', shadow: 'lg', children: '기본 카드' },
};

export const Blue = {
  args: { variant: 'blue', shadow: 'lg', children: '코발트 카드' },
};

export const Yellow = {
  args: { variant: 'yellow', shadow: 'lg', children: '마리골드 카드' },
};

export const Coral = {
  args: { variant: 'coral', shadow: 'lg', children: '코랄 카드' },
};

export const AccentShadow = {
  args: {
    variant: 'yellow',
    shadow: 'accent',
    children: '코랄 그림자가 달린 마리골드 카드',
  },
};
