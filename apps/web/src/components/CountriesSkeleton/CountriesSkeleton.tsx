import { Card, SimpleGrid, Skeleton, Stack } from '@acme/ui';

export function CountriesSkeleton() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Skeleton height={120} />
            <Skeleton height={24} width="80%" />
            <Skeleton height={16} width="60%" />
            <Skeleton height={16} width="70%" />
            <Skeleton height={16} width="50%" />
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
