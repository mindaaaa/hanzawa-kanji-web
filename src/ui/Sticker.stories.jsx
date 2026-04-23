import Sticker from './Sticker.jsx';

export default {
  title: 'UI/Sticker',
  component: Sticker,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['coral', 'yellow', 'blue'],
    },
  },
};

export const Coral = { args: { variant: 'coral', children: '新刊！' } };
export const Yellow = { args: { variant: 'yellow', children: 'NEW!' } };
export const Blue = { args: { variant: 'blue', children: '✦ 終 ✦' } };
