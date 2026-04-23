import Pill from './Pill.jsx';

export default {
  title: 'UI/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    on: { control: 'boolean' },
  },
};

export const Off = { args: { on: false, children: '번호순' } };
export const On = { args: { on: true, children: '번호순' } };

export const Group = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Pill on>번호순</Pill>
      <Pill>섞기</Pill>
    </div>
  ),
};
