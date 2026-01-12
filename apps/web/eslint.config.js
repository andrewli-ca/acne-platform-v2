import acmeReactConfig from '@acme/config/eslint/react';

// @ts-check
export default [
  ...acmeReactConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];
