import { Card, SimpleGrid, Skeleton, Stack } from '@acme/ui';

export function BerrySkeleton() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            {/* Berry name */}
            <Skeleton height={24} width="60%" />

            {/* Berry stats */}
            <Stack gap="xs">
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={16} width="75%" />
              <Skeleton height={16} width="65%" />
            </Stack>

            {/* Flavors */}
            <Skeleton height={20} width="90%" />
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
