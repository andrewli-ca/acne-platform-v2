import type { ReactNode } from 'react';

import { Button as MantineButton } from '@mantine/core';

export interface TestButtonProps {
  /**
   * Button label text
   */
  label: string;
  /**
   * Button variant style
   */
  variant?: 'filled' | 'light' | 'outline' | 'subtle' | 'default';
  /**
   * Button color
   */
  color?: string;
  /**
   * Button size
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Optional icon to display before the label
   */
  leftIcon?: ReactNode;
  /**
   * Optional icon to display after the label
   */
  rightIcon?: ReactNode;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Whether the button should take full width
   */
  fullWidth?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * TestButton component - A simple button component for testing Storybook
 */
export function TestButton({
  label,
  variant = 'filled',
  color = 'blue',
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  fullWidth = false,
  onClick,
}: TestButtonProps) {
  return (
    <MantineButton
      variant={variant}
      color={color}
      size={size}
      leftSection={leftIcon}
      rightSection={rightIcon}
      disabled={disabled}
      fullWidth={fullWidth}
      onClick={onClick}
    >
      {label}
    </MantineButton>
  );
}
