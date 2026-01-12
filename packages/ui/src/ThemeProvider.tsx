import '@mantine/core/styles.css';
import './geist-fonts';

import type { ReactNode } from 'react';
import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './theme';

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: MantineThemeOverride;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <MantineProvider theme={theme || mantineTheme}>{children}</MantineProvider>;
}
