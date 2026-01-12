---
description: 'Always use Mantine props for colors, spacing, and layout instead of CSS modules'
alwaysApply: true
---

# Mantine Props Over CSS

## CRITICAL: Use Mantine Component Props First

### 1. Text Colors - Use the `color` Prop

**✅ CORRECT:**

```tsx
<Text color="gray">Label</Text>
<Text color="red">Error message</Text>
<Badge color="green">Active</Badge>
```

**❌ WRONG - Don't put text colors in CSS:**

```css
/* DON'T DO THIS */
.text {
  color: var(--gray-11);
}
```

**Available color values:** `gray`, `gold`, `bronze`, `brown`, `yellow`, `amber`, `orange`, `tomato`, `red`, `crimson`, `pink`, `plum`, `purple`, `violet`, `iris`, `indigo`, `blue`, `cyan`, `teal`, `jade`, `green`, `grass`, `lime`, `mint`, `sky`

### 2. Spacing - Use Mantine Props

**✅ CORRECT:**

```tsx
<Box p="4" px="5" py="3">Content</Box>
<Flex gap="3" direction="column">...</Flex>
```

**❌ WRONG - Don't put spacing in CSS:**

```css
/* DON'T DO THIS */
.box {
  padding: var(--space-4);
  gap: var(--space-3);
}
```

### 3. Layout - Use Mantine Components & Props

**✅ CORRECT:**

```tsx
<Flex direction="column" gap="4" align="center" justify="between">
  <Text>Content</Text>
</Flex>
```

**❌ WRONG:**

```css
/* DON'T DO THIS */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
```

## When to Use CSS Modules

**CSS Modules should ONLY contain:**

✅ Hover effects and states (`:hover`, `:focus`, `:active`)
✅ Animations and transitions
✅ Cursor behavior (`cursor: pointer`)
✅ Structural positioning (`position: sticky`, `position: absolute`)
✅ Pseudo-elements (`::before`, `::after`)
✅ Media queries
✅ Complex selectors

**DO NOT put in CSS Modules:**

❌ Text colors → Use `color` prop on `Text` components
❌ Padding/margin → Use `p`, `m`, `px`, `py`, `mx`, `my` props
❌ Gap → Use `gap` prop
❌ Border radius → Use inline style with `borderRadius: 'var(--radius-2)'` if needed
❌ Basic flexbox layout → Use `<Flex>` component with props

## Decision Tree

1. **Text color?** → `<Text color="gray">`
2. **Spacing (padding/margin/gap)?** → Use props: `p="4"`, `gap="3"`
3. **Layout?** → Use `<Flex>` or `<Grid>` with props
4. **Hover/animation?** → CSS module
5. **Dynamic value?** → Inline `style` prop
6. **Positioning?** → CSS module

## Examples

### ❌ BEFORE (Wrong)

```tsx
// Component.tsx
<Text className={styles.label}>Hello</Text>

// Component.module.css
.label {
  color: var(--gray-11);
  padding: var(--space-2);
}
```

### ✅ AFTER (Correct)

```tsx
// Component.tsx
<Text color="gray" p="2">
  Hello
</Text>

// No CSS module needed!
```

### ✅ Good Use of CSS Module

```tsx
<Flex gap="3" p="3" className={styles.button}>
  Click me
</Flex>

// Component.module.css - Only advanced CSS features
.button {
  cursor: pointer;
  transition: background 0.2s;
}

.button:hover {
  background: var(--gray-3);
}
```

## Quick Reference

| Property   | Use             | Example               |
| ---------- | --------------- | --------------------- |
| Text color | `color` prop    | `<Text color="gray">` |
| Padding    | `p`, `px`, `py` | `<Box p="4">`         |
| Margin     | `m`, `mx`, `my` | `<Box m="2">`         |
| Gap        | `gap` prop      | `<Flex gap="3">`      |
| Hover      | CSS module      | `.btn:hover { ... }`  |
| Transition | CSS module      | `transition: 0.2s;`   |
| Cursor     | CSS module      | `cursor: pointer;`    |
| Dynamic    | Inline style    | `style={{ width }}`   |

---

**Full guide:** See `docs/guides/Mantine-props-rule.md`
