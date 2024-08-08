import { Meta, StoryFn } from '@storybook/react';
import Login from '../pages/login';
import NonAuthLayout from '~/components/layout/NonAuthLayout';
import { loginHandler } from '~/tests/handlers/auth';

const meta: Meta<typeof Login> = {
  title: 'Pages/Login',
  component: Login,
  decorators: [
    (Story) => (
      <NonAuthLayout>
        <Story />
      </NonAuthLayout>
    ),
  ],
  parameters: {
    msw: {
      handlers: [loginHandler],
    },
  },
};

export default meta;

export const Default: StoryFn<typeof Login> = () => <Login />;
