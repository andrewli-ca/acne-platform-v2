import mantine from 'eslint-config-mantine';
import base from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  ...mantine,
  {
    files: ['**/*.{tsx,jsx}'],
    rules: {
      // React-specific rules
      'react/prop-types': 'off', // Using TypeScript
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      // Note: react-hooks rules are configured by eslint-config-mantine
      // If they're not working, the plugin might need to be in consuming package's devDependencies
    },
  },
  {
    files: ['**/*.story.{ts,tsx}', '**/*.stories.{ts,tsx}'],
    rules: {
      'no-console': 'off', // Allow console in stories
    },
  },
];
