# @acme/config

Shared configuration for all packages in the acne-platform-v2 monorepo.

## Available Configs

### ESLint

- **`@acme/config/eslint/base`** - Base ESLint config for all packages
- **`@acme/config/eslint/react`** - For React applications (extends base + Mantine rules)
- **`@acme/config/eslint/library`** - For shared library packages (stricter rules)

### TypeScript

- **`@acme/config/typescript/base`** - Base TypeScript config
- **`@acme/config/typescript/react`** - For React applications with Vite & testing
- **`@acme/config/typescript/library`** - For library packages

### Prettier

- **`@acme/config/prettier`** - Prettier configuration with import sorting

### Stylelint

- **`@acme/config/stylelint`** - Stylelint configuration for CSS/SCSS

## Usage Examples

### ESLint

```js
// eslint.config.js
import acmeConfig from '@acme/config/eslint/react';

export default [
  ...acmeConfig,
  // Your custom rules here
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
  },
];
```

### TypeScript

```json
// tsconfig.json
{
  "extends": "@acme/config/typescript/react",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

### Prettier

```js
// prettier.config.mjs
import acmeConfig from '@acme/config/prettier';

export default acmeConfig;
```

### Stylelint

```json
// .stylelintrc.json
{
  "extends": "@acme/config/stylelint"
}
```

## Features

- ✅ Modern ESLint flat config format
- ✅ Strict TypeScript with best practices
- ✅ Automatic import sorting with Prettier
- ✅ CSS Modules support with Stylelint
- ✅ React 19 and Mantine optimized
- ✅ Consistent rules across all packages

## Maintenance

All configuration is centralized in this package. To update linting rules, TypeScript settings, or formatting options, modify the files in this package and all workspaces will inherit the changes.
