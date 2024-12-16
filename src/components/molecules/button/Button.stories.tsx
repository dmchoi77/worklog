import { Meta, StoryFn } from '@storybook/react';
import { Button } from '~/components/molecules/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/molecules/Button',
  component: Button,
  args: {
    fullWidth: false,
    children: '버튼',
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

export const Default: StoryFn<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;
