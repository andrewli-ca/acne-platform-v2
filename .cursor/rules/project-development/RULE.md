---
description: "Core development standards for package management, styling, routing, monorepo structure, and performance optimization"
alwaysApply: true
---

# Project Development Rules

## Core Technologies

- **Package Manager:** `pnpm` (Always use pnpm for installing, adding, or running scripts).
- **Styling:** A custom UI based on Mantine with CSS Modules. **NEVER use Tailwind CSS.**
- **Routing:** TanStack Router.
- **State/Data:** TanStack Query.

## Styling Strategy

**Refers to:** `.cursor/rules/mantine-props/RULE.md`

- **Core Principle:** Use Mantine component props (`color`, `p`, `m`, `gap`) for standard styling.
- **CSS Modules:** Use ONLY for advanced features (hover, transitions, positioning).
- **Inline Styles:** Use ONLY for dynamic values.

### References

- **Detailed rules:** `.cursor/rules/radix-props/RULE.md`
- **Full guides:** `docs/guides/css-strategy.md`, `docs/guides/radix-props-rule.md`
- **Example:** `packages/ui/src/components/FeatureCard.tsx`

## Monorepo Import & Export Rules

1. **The `@acme/ui` Gatekeeper:**
   - Always import UI components, layout primitives (`Flex`, `Text`, `Box`, `Grid`), and the `Theme` from the `@acme/ui` package.
   - **DO NOT** import directly from Mantine within the application code (`apps/dashboard`).
   - If a Mantine primitive or component is missing from `@acme/ui/src/index.ts`, **you must export it there first** before using it in the app.

2. **Explicit Named Exports:**
   - `packages/ui` and `packages/api` MUST use **explicit named exports** in their `index.ts` files.
   - **NEVER** use `export * from '...'`.

3. **Shared Dependency Optimization:**
   - In `packages/ui/package.json`, always list `react` and `react-dom` as `peerDependencies`.
   - Never install `react` as a regular dependency in shared packages to avoid duplicate instances.

4. **No Barrel Files in Apps:**
   - Inside `apps/dashboard`, import local components directly from their file paths.
   - **Example:** `import { Sidebar } from '../components/Sidebar'` is correct.
   - **Example:** `import { Sidebar } from '../components'` is forbidden.

## Performance & Routing

- **Auto Code Splitting:** We use `autoCodeSplitting: true` in the TanStack Router Vite plugin.
- **No `.lazy.tsx`:** Write standard `.tsx` route files; the plugin handles splitting automatically.
- **Data Loading:** Always use `ensureQueryData` in Loaders and `useSuspenseQuery` in Components.
