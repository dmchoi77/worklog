import { Meta, StoryFn } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/molecules/Button',
  component: Button,
  args: {
    fullWidth: false,
    label: '버튼',
    disabled: false,
  },
  argTypes: {
    children: {
      type: { name: 'string' },
    },
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

export const Filled: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Outlined: StoryFn<typeof Button> = (args) => <Button variant='outlined' {...args} />;
