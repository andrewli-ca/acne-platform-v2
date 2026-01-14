import { useSuspenseQuery } from '@tanstack/react-query';

import type { Berry } from '@acme/pokemon';
import { Badge, Box, Card, Flex, SimpleGrid, Stack, Text, Title } from '@acme/ui';

import { berriesQueryOptions } from '@/queries/pokemon';

/**
 * Berries List Component
 * Wrapped in its own Suspense boundary - loads independently
 */
export function BerriesList() {
  // useSuspenseQuery will suspend this component until data is ready
  const { data: berries } = useSuspenseQuery(berriesQueryOptions);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {berries.map((berry: Berry) => {
        // Format berry name
        const name = berry.name
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Get dominant flavor (highest potency) - only if flavors exist
        const dominantFlavor =
          berry.flavors && berry.flavors.length > 0
            ? berry.flavors.reduce((max, flavor) =>
                flavor.potency > max.potency ? flavor : max
              )
            : null;

        return (
          <Card key={berry.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Stack gap="md">
              {/* Berry name */}
              <Flex justify="space-between" align="center">
                <Title order={4}>{name}</Title>
                <Text size="sm" c="dimmed" fw={500}>
                  #{berry.id}
                </Text>
              </Flex>

              {/* Berry stats */}
              <Stack gap="xs">
                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Size:
                  </Text>
                  <Text size="sm">{berry.size} mm</Text>
                </Flex>

                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Growth Time:
                  </Text>
                  <Text size="sm">{berry.growth_time} hours</Text>
                </Flex>

                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Max Harvest:
                  </Text>
                  <Text size="sm">{berry.max_harvest}</Text>
                </Flex>

                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Firmness:
                  </Text>
                  <Text size="sm" style={{ textTransform: 'capitalize' }}>
                    {berry.firmness.name}
                  </Text>
                </Flex>
              </Stack>

              {/* Flavors - only render if dominant flavor exists */}
              {dominantFlavor && (
                <Box>
                  <Text size="sm" fw={500} c="dimmed" mb="xs">
                    Dominant Flavor:
                  </Text>
                  <Badge variant="filled" size="md" style={{ textTransform: 'capitalize' }}>
                    {dominantFlavor.flavor.name} ({dominantFlavor.potency})
                  </Badge>
                </Box>
              )}
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
