import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/molecules/Select',
  component: Select,
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
    ],
  },

  decorators: [
    (Story) => (
      <div className='flex justify-center items-center h-screen'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: StoryFn<typeof Select> = (args) => {
  const [selected, setSelected] = useState('');

  return (
    <div>
      <Select {...args} selected={selected} onChange={setSelected} />
    </div>
  );
};
