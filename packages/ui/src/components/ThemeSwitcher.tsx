import { Monitor, Moon, Sun } from 'lucide-react';

import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';

export interface ThemeSwitcherProps {
  /** Size of the action icons */
  size?: string | number;
  /** Variant of the action icons */
  variant?: string;
}

type ColorScheme = 'light' | 'dark' | 'auto';

/**
 * ThemeSwitcher component for switching between light, dark, and auto themes
 * Uses ActionIcon components to provide theme selection
 */
export function ThemeSwitcher({ size = 'lg', variant = 'subtle' }: ThemeSwitcherProps) {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const handleThemeChange = (scheme: ColorScheme) => {
    setColorScheme(scheme);
  };

  return (
    <Group gap="xs">
      <ActionIcon
        onClick={() => handleThemeChange('light')}
        variant={colorScheme === 'light' ? 'filled' : variant}
        size={size}
        aria-label="Light theme"
        title="Light theme"
      >
        <Sun size={18} />
      </ActionIcon>
      <ActionIcon
        onClick={() => handleThemeChange('dark')}
        variant={colorScheme === 'dark' ? 'filled' : variant}
        size={size}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <Moon size={18} />
      </ActionIcon>
      <ActionIcon
        onClick={() => handleThemeChange('auto')}
        variant={colorScheme === 'auto' ? 'filled' : variant}
        size={size}
        aria-label="Auto theme"
        title="Auto theme (follows system)"
      >
        <Monitor size={18} />
      </ActionIcon>
    </Group>
  );
}
