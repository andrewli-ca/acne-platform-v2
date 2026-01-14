import type { ReactNode } from 'react';

import { Paper, type PaperProps } from '@mantine/core';

export interface TableCardProps extends PaperProps {
  children: ReactNode;
}

/**
 * TableCard Component
 * Wraps tables with a consistent card-style background, border, and shadow.
 * Use this as the default wrapper for all Table components.
 */
export function TableCard({ children, ...props }: TableCardProps) {
  return (
    <Paper withBorder shadow="sm" radius="md" {...props}>
      {children}
    </Paper>
  );
}
