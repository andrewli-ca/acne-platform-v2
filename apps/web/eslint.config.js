import mantine from 'eslint-config-mantine';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// @ts-check
export default defineConfig(
  tseslint.configs.recommended,
  ...mantine,
  { ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}'] },
  {
    files: ['**/*.story.tsx'],
    rules: { 'no-console': 'off' },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  }
);
