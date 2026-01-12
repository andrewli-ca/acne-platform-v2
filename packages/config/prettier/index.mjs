/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    // Styles first
    '.*styles.css$',
    '',
    // React ecosystem
    '^react$',
    '^react-dom$',
    '^next$',
    '^next/.*$',
    '',
    // Node builtins
    '<BUILTIN_MODULES>',
    '',
    // Third-party packages
    '<THIRD_PARTY_MODULES>',
    '',
    // Mantine
    '^@mantine/(.*)$',
    '^@mantinex/(.*)$',
    '^@mantine-tests/(.*)$',
    '',
    // Internal packages
    '^@acme/(.*)$',
    '^@docs/(.*)$',
    '',
    // Relative imports (non-CSS)
    '^@/.*$',
    '^../(?!.*.css$).*$',
    '^./(?!.*.css$).*$',
    '',
    // CSS imports last
    '\\.css$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
  overrides: [
    {
      files: '*.mdx',
      options: {
        printWidth: 70,
      },
    },
  ],
};

export default config;
