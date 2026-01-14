import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Clock, Grape } from 'lucide-react';

import type { Berry, Pokemon } from '@acme/pokemon';
import { Badge, Box, Card, Divider, Flex, SimpleGrid, Stack, Table, Text, Title } from '@acme/ui';

import { berriesQueryOptions, pokemonTableQueryOptions } from '@/queries/pokemon';

export const Route = createFileRoute('/_auth/pokemon-await')({
  loader: async ({ context }) => {
    // AWAIT data loading - blocks navigation until both queries complete
    // Router will show defaultPendingComponent until this loader finishes
    await context.queryClient.ensureQueryData(pokemonTableQueryOptions);
    await context.queryClient.ensureQueryData(berriesQueryOptions);
  },
  component: PokemonAwaitPage,
});

/**
 * Pokemon Table Component (Non-Suspense Version)
 * Uses regular useQuery - data is guaranteed to exist from loader
 */
function PokemonTableContent() {
  const { data: pokemons } = useQuery(pokemonTableQueryOptions);

  // Data is guaranteed to exist because loader awaited it
  if (!pokemons) return null;

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Types</Table.Th>
            <Table.Th>Height</Table.Th>
            <Table.Th>Weight</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {pokemons.map((pokemon: Pokemon) => (
            <Table.Tr key={pokemon.id}>
              <Table.Td>
                <Text fw={500}>#{String(pokemon.id).padStart(3, '0')}</Text>
              </Table.Td>
              <Table.Td>
                <Text style={{ textTransform: 'capitalize' }}>{pokemon.name}</Text>
              </Table.Td>
              <Table.Td>
                <Flex gap="xs">
                  {pokemon.types.map((type) => (
                    <Badge key={type.slot} size="sm" variant="light">
                      {type.type.name}
                    </Badge>
                  ))}
                </Flex>
              </Table.Td>
              <Table.Td>{(pokemon.height / 10).toFixed(1)} m</Table.Td>
              <Table.Td>{(pokemon.weight / 10).toFixed(1)} kg</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}

/**
 * Berries List Component (Non-Suspense Version)
 * Uses regular useQuery - data is guaranteed to exist from loader
 */
function BerriesListContent() {
  const { data: berries } = useQuery(berriesQueryOptions);

  // Data is guaranteed to exist because loader awaited it
  if (!berries) return null;

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
            ? berry.flavors.reduce((max, flavor) => (flavor.potency > max.potency ? flavor : max))
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

/**
 * Await Strategy Demo
 * Blocking loader with defaultPendingComponent
 */
function PokemonAwaitPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      {/* Header */}
      <Box>
        <Flex align="center" gap="md" mb="md">
          <Clock size={32} />
          <Title order={2}>Await Strategy (Blocking)</Title>
        </Flex>
        <Text c="dimmed">
          This page demonstrates blocking await in the loader with no Suspense boundaries. The
          router shows the defaultPendingComponent (centered spinner) until all data is loaded, then
          the entire page appears at once. No individual section loaders are shown.
        </Text>
      </Box>

      {/* Pokemon Table Section */}
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Title order={3}>Top 10 Pokémon</Title>
          <Badge variant="light" size="lg">
            No Suspense Boundary
          </Badge>
        </Flex>
        <Text size="sm" c="dimmed">
          This table uses regular useQuery. The data is guaranteed to be available because the
          loader awaited it before navigation completed.
        </Text>

        {/* No Suspense wrapper - data is guaranteed from loader */}
        <PokemonTableContent />
      </Stack>

      <Divider size="md" />

      {/* Berries Section */}
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Grape size={24} />
          <Title order={3}>Pokémon Berries</Title>
          <Badge variant="light" size="lg">
            No Suspense Boundary
          </Badge>
        </Flex>
        <Text size="sm" c="dimmed">
          This berries grid also uses regular useQuery. Both sections were loaded together in the
          loader before the page rendered.
        </Text>

        {/* No Suspense wrapper - data is guaranteed from loader */}
        <BerriesListContent />
      </Stack>
    </Flex>
  );
}
