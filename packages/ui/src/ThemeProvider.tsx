import '@mantine/core/styles.css';

import type { ReactNode } from 'react';

import { MantineProvider, type MantineThemeOverride } from '@mantine/core';

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: MantineThemeOverride;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
