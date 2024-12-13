import { Meta, StoryFn } from '@storybook/react';
import LoginPage from '~/app/(auth)/login/page';
import { AuthLayout } from '~/components/templates/layout/AuthLayout';
import { loginHandler } from '~/tests/handlers/auth';

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
  parameters: {
    msw: {
      handlers: [loginHandler],
    },
  },
};

export default meta;

export const Default: StoryFn<typeof LoginPage> = () => <LoginPage />;
