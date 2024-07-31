import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // addons: ['storybook-addon-next', 'storybook-addon-next-router'],
  framework: '@storybook/nextjs',
};
export default config;
