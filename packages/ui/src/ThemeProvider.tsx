import '@mantine/core/styles.css';
import './geist-fonts';

import { MantineProvider, type MantineThemeOverride } from '@mantine/core';
import type { ReactNode } from 'react';
import { mantineTheme } from './theme';


export interface ThemeProviderProps {
  children: ReactNode;
  theme?: MantineThemeOverride;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <MantineProvider theme={theme || mantineTheme}>{children}</MantineProvider>;
}
