import { Card, SimpleGrid, Skeleton, Stack } from '@acme/ui';

export function PokemonSkeleton() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {Array.from({ length: 20 }).map((_, i) => (
        <Card key={i} shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Skeleton height={200} />
            <Skeleton height={24} width="80%" />
            <Skeleton height={16} width="40%" />
            <Stack gap="xs">
              <Skeleton height={20} width="60%" />
              <Skeleton height={16} width="70%" />
              <Skeleton height={16} width="65%" />
              <Skeleton height={16} width="75%" />
            </Stack>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
}
