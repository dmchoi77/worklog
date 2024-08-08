import type { StorybookConfig } from '@storybook/nextjs';

import { join, dirname } from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  framework: '@storybook/nextjs',
};
export default config;
