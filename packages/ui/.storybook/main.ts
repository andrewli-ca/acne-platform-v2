import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
