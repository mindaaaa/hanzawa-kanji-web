import { useState } from 'react';
import CountSelect from './CountSelect.jsx';

export default {
  title: 'Components/CountSelect',
  component: CountSelect,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: { selected: null, onSelect: () => {} },
};

export const Selected20 = {
  args: { selected: 20, onSelect: () => {} },
};

export const Interactive = {
  render: () => {
    const [value, setValue] = useState(null);
    return <CountSelect selected={value} onSelect={setValue} />;
  },
};
