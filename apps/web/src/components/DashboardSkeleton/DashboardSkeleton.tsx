import { Card, SimpleGrid, Skeleton, Stack } from '@acme/ui';

export function DashboardSkeleton() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {[1, 2, 3].map((i) => (
        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="xs">
            <Skeleton height={16} width="40%" />
            <Skeleton height={28} width="60%" />
            <Skeleton height={20} width="30%" />
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
