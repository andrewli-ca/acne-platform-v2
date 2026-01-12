import base from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  {
    rules: {
      // Stricter rules for library packages
      'no-console': 'error', // Libraries should never console.log
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
    },
  },
];
