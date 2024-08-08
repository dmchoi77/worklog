import type { Preview } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { initialize, mswLoader } from 'msw-storybook-addon';

initialize();

const queryClient = new QueryClient();

const withQueryClientProvider = (Story: any) => (
  <QueryClientProvider client={queryClient}>
    <Story />
  </QueryClientProvider>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      navigation: {
        pathname: '/',
      },
      appDirectory: true,
    },
  },
  loaders: [mswLoader],

  decorators: [withQueryClientProvider],
};

export default preview;
