import { Meta, StoryFn } from '@storybook/react';

import Button from '~/components/button/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    msw: {},
  },
  args: {
    isDisabled: false,
    fullWidth: false,
    children: 'Button',
  },
  argTypes: {
    children: {
      type: { name: 'string' },
    },
  },
};

export default meta;

export const Default: StoryFn<typeof Button> = (args) => <Button {...args}>{args.children}</Button>;
