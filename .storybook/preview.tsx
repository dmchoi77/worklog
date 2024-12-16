import type { Preview } from '@storybook/react';
import React from 'react';
import './globals.css';
import { initialize, mswLoader } from 'msw-storybook-addon';
import Providers from '../src/app/Providers';
import '@radix-ui/themes/styles.css';

initialize();

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

  decorators: [(Story) => <Providers>{Story()}</Providers>],
};

export default preview;
