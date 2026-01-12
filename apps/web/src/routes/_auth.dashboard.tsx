import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import { Box, Flex, SimpleGrid, StatCard, Title } from '@acme/ui';

import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { dashboardQueryOptions } from '@/queries/dashboard';

export const Route = createFileRoute('/_auth/dashboard')({
  loader: ({ context }) => {
    // Pre-fetch dashboard stats
    return context.queryClient.ensureQueryData(dashboardQueryOptions);
  },
  component: DashboardPage,
});

function DashboardContent() {
  const { data: stats } = useSuspenseQuery(dashboardQueryOptions);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          trendDirection={stat.trendDirection}
        />
      ))}
    </SimpleGrid>
  );
}

function DashboardPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      <Box>
        <Title order={2}>Dashboard</Title>
      </Box>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </Flex>
  );
}
