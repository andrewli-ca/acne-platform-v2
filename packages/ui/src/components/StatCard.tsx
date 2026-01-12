import type { ReactNode } from 'react';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Badge, Card, Flex, Text } from '@mantine/core';

export interface StatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
  icon?: ReactNode;
}

/**
 * StatCard component for displaying dashboard metrics
 * Shows a label, value, and optional trend indicator
 */
export function StatCard({ label, value, trend, trendDirection, icon }: StatCardProps) {
  const TrendIcon = trendDirection === 'up' ? TrendingUp : TrendingDown;
  const trendColor = trendDirection === 'up' ? 'green' : 'red';

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex direction="column" gap="xs">
        <Flex justify="space-between" align="center">
          <Text size="sm" fw={500} c="dimmed">
            {label}
          </Text>
          {icon && <div>{icon}</div>}
        </Flex>

        <Text size="xl" fw={700}>
          {value}
        </Text>

        {trend && trendDirection && (
          <Flex align="center" gap="xs">
            <Badge color={trendColor} variant="light" size="sm">
              <Flex align="center" gap={4}>
                <TrendIcon size={12} />
                <Text size="xs">{trend}</Text>
              </Flex>
            </Badge>
          </Flex>
        )}
      </Flex>
    </Card>
  );
}
