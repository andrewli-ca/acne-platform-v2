import js from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      // Common rules for all packages
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      // Enforce subfolder imports for @acme/utils (better tree-shaking)
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@acme/utils',
              message:
                'Import from specific subfolders instead: @acme/utils/date, @acme/utils/string, @acme/utils/number',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.next/**',
      '**/build/**',
      '**/*.config.{js,mjs,cjs}',
      '**/*.d.ts',
    ],
  },
];
