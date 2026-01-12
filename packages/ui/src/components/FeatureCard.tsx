import type { ReactNode } from 'react';

import { Card, Flex, Text, ThemeIcon, Title } from '@mantine/core';

export interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color?: string;
}

/**
 * FeatureCard component for showcasing features
 * Displays an icon, title, and description
 */
export function FeatureCard({ title, description, icon, color = 'blue' }: FeatureCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex direction="column" gap="md">
        <ThemeIcon size="xl" radius="md" variant="light" color={color}>
          {icon}
        </ThemeIcon>

        <div>
          <Title order={4} mb="xs">
            {title}
          </Title>
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        </div>
      </Flex>
    </Card>
  );
}
