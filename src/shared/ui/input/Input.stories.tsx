import { Meta, StoryFn } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/molecules/Input',
  component: Input,
  args: {
    placeholder: 'Enter information',
    disabled: false,
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

export const Default: StoryFn<typeof Input> = (args) => {
  return (
    <div>
      <Input {...args} />
    </div>
  );
};
