import { Meta, StoryFn } from '@storybook/react';
import { LoginPage } from './LoginPage';
import { AuthLayout } from '~/shared/ui/layout/AuthLayout';
import { loginFailHandler, loginHandler } from '~/tests/handlers/auth';

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/Login',
  component: LoginPage,
  decorators: [
    (Story) => (
      <AuthLayout>
        <Story />
      </AuthLayout>
    ),
  ],
};

export default meta;

export const Success: StoryFn<typeof LoginPage> = () => <LoginPage />;
Success.parameters = {
  msw: {
    handlers: [loginHandler],
  },
};

export const Fail: StoryFn<typeof LoginPage> = () => <LoginPage />;
Fail.parameters = {
  msw: {
    handlers: [loginFailHandler],
  },
};
