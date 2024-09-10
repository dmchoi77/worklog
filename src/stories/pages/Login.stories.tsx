import { Meta, StoryFn } from '@storybook/react';

import LoginPage from '../../pages/login';

import { NonAuthLayout } from '~/components/templates/layout/NonAuthLayout';

import { loginHandler } from '~/tests/handlers/auth';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Login',
  component: LoginPage,
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

export const Default: StoryFn<typeof LoginPage> = () => <LoginPage />;
