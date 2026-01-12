import type { ReactNode } from 'react';

import { Modal, Text, Title } from '@mantine/core';

export interface DataDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
}

/**
 * DataDialog component for displaying detailed data in a modal
 * Wraps Mantine Modal with a consistent API
 */
export function DataDialog({ open, onOpenChange, title, description, children }: DataDialogProps) {
  return (
    <Modal
      opened={open}
      onClose={() => onOpenChange(false)}
      title={<Title order={4}>{title}</Title>}
      size="md"
      centered
    >
      {description && (
        <Text size="sm" c="dimmed" mb="md">
          {description}
        </Text>
      )}
      {children}
    </Modal>
  );
}
