import Pill from './Pill.jsx';

export default {
  title: 'UI/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    on: { control: 'boolean' },
  },
};

export const Off = { args: { on: false, children: 'ID 순서' } };
export const On = { args: { on: true, children: 'ID 순서' } };

export const Group = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Pill on>ID 순서</Pill>
      <Pill>랜덤 셔플</Pill>
    </div>
  ),
};
