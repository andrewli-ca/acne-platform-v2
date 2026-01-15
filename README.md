# Acme Platform

## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

## Monorepo Structure

This is a pnpm monorepo with the following packages:

```
apps/
  web/              # Main web application (Vite + React)

packages/
  api/              # API client types
  config/           # Shared ESLint, Prettier, TypeScript configs
  countries/        # Countries API client
  http-client/      # Base HTTP client
  pokemon/          # Pokemon API client
  ui/               # Shared UI components (@acme/ui)
  utils/            # Shared utilities (@acme/utils)
```

## Dependency Management

### Version Consistency

Shared dependency versions are managed centrally in the root `package.json` using `pnpm.overrides`:

```json
{
  "pnpm": {
    "overrides": {
      "react": "^19.2.0",
      "dayjs": "^1.11.19",
      "@mantine/core": "8.3.12"
    }
  }
}
```

This ensures all packages use the same version of shared dependencies, preventing version drift and reducing bundle size.

### Updating a Shared Dependency

**Option 1: Update override only (quick)**

1. Edit the version in root `package.json` under `pnpm.overrides`
2. Run `pnpm install`

```bash
# All packages now use the new version
pnpm install
```

**Option 2: Update all package.json files (recommended for major updates)**

```bash
# Updates the dependency everywhere and syncs all package.json files
pnpm update <package-name> --recursive
```

**Option 3: Update a specific package's dependencies**

```bash
# Update dependencies in a specific package
pnpm update --filter @acme/ui
```

### Adding a New Shared Dependency

1. Add to `pnpm.overrides` in root `package.json` to enforce version
2. Add to the specific package(s) that need it

```bash
# Add to a specific package
pnpm add dayjs --filter @acme/utils

# Then add to root overrides to enforce version consistency
```

### Checking for Version Inconsistencies

```bash
# Find all versions of a specific package
grep -r '"react":' apps/*/package.json packages/*/package.json
```

## npm scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
