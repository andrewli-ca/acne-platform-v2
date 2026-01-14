import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './geist-fonts';

import type { ReactNode } from 'react';

import { MantineProvider, type MantineThemeOverride } from '@mantine/core';

import { mantineTheme } from './theme';

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: MantineThemeOverride;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <MantineProvider theme={theme || mantineTheme}>{children}</MantineProvider>;
}
