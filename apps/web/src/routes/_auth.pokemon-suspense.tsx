import { Suspense } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { BookOpen, Grape } from 'lucide-react';

import { Badge, Box, Divider, Flex, Stack, Text, Title } from '@acme/ui';

import { BerriesList, BerrySkeleton } from '@/components/Berries';
import { PokemonTable } from '@/components/Pokemon';
import { TableSkeleton } from '@/components/TableSkeleton';
import { berriesQueryOptions, pokemonTableQueryOptions } from '@/queries/pokemon';

// import { berriesQueryOptions, pokemonTableQueryOptions } from '@/queries/pokemon';

export const Route = createFileRoute('/_auth/pokemon-suspense')({
  loader: async ({ context }) => {
    // Prefetching disabled to observe Suspense boundaries
    // Uncomment these lines to enable prefetching:
    await context.queryClient.prefetchQuery(pokemonTableQueryOptions);
    await context.queryClient.prefetchQuery(berriesQueryOptions);
  },
  component: PokemonSuspensePage,
});

/**
 * Main Page Component
 * Demonstrates multiple independent Suspense boundaries
 */
function PokemonSuspensePage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      {/* Header */}
      <Box>
        <Flex align="center" gap="md" mb="md">
          <BookOpen size={32} />
          <Title order={2}>React Suspense Demo</Title>
        </Flex>
        <Text c="dimmed">
          This page demonstrates multiple Suspense boundaries with concurrent loading. Each section
          loads independently - notice how the faster query displays first while the slower one
          continues loading.
        </Text>
      </Box>

      {/* Pokemon Table Section */}
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Title order={3}>Top 10 Pokémon</Title>
          <Badge variant="light" size="lg">
            Suspense Boundary #1
          </Badge>
        </Flex>
        <Text size="sm" c="dimmed">
          This table is wrapped in its own Suspense boundary. It will show a skeleton loader until
          the data is ready.
        </Text>

        {/* First Suspense Boundary */}
        <Suspense fallback={<TableSkeleton />}>
          <PokemonTable />
        </Suspense>
      </Stack>

      <Divider size="md" />

      {/* Berries Section */}
      <Stack gap="md">
        <Flex align="center" gap="sm">
          <Grape size={24} />
          <Title order={3}>Pokémon Berries</Title>
          <Badge variant="light" size="lg">
            Suspense Boundary #2
          </Badge>
        </Flex>
        <Text size="sm" c="dimmed">
          This berries grid is wrapped in a separate Suspense boundary. It loads completely
          independently from the Pokémon table above.
        </Text>

        {/* Second Suspense Boundary */}
        <Suspense fallback={<BerrySkeleton />}>
          <BerriesList />
        </Suspense>
      </Stack>
    </Flex>
  );
}
