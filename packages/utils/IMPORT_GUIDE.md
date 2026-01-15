# Utils Package Import Guide

## Rule: Use Subfolder Imports

When importing from `@acme/utils`, you **must** import from specific subfolders rather than the root package.

### ❌ Wrong

```typescript
import { formatCurrency } from '@acme/utils';
import { formatDate, capitalize } from '@acme/utils';
```

### ✅ Correct

```typescript
import { formatCurrency } from '@acme/utils/number';
import { formatDate } from '@acme/utils/date';
import { capitalize } from '@acme/utils/string';
```

## Why?

1. **Better Tree-Shaking**: Bundlers can eliminate unused code more effectively
2. **Faster Builds**: Don't need to load the entire utils package index
3. **Explicit Dependencies**: Makes it clear which utility categories you depend on
4. **Smaller Bundles**: Only the specific utilities you need are included

## Available Subfolders

- `@acme/utils/date` - Date formatting, manipulation, comparison, quarters
- `@acme/utils/string` - String transformations, case conversion, validation
- `@acme/utils/number` - Number formatting (currency, percentages, file sizes)

## Enforcement

This is enforced via ESLint's `no-restricted-imports` rule in `packages/config/eslint/base.js`.

If you try to import from `@acme/utils`, ESLint will show:

```
Import from specific subfolders instead: @acme/utils/date, @acme/utils/string, @acme/utils/number
```

## Examples

```typescript
// Date utilities
import { formatDate, DateFormat, addDays } from '@acme/utils/date';

// String utilities
import { capitalize, slugify, truncate } from '@acme/utils/string';

// Number utilities
import { formatCurrency, formatPercent } from '@acme/utils/number';

// Multiple categories (separate imports)
import { formatDate } from '@acme/utils/date';
import { capitalize } from '@acme/utils/string';
import { formatCurrency } from '@acme/utils/number';
```
