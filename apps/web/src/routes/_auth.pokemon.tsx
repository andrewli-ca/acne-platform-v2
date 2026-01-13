import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Zap } from 'lucide-react';

import { Badge, Box, Card, Flex, SimpleGrid, Stack, Text, Title } from '@acme/ui';

import { PokemonSkeleton } from '@/components/PokemonSkeleton';
import { pokemonQueryOptions } from '@/queries/pokemon';

export const Route = createFileRoute('/_auth/pokemon')({
  loader: ({ context }) => {
    // Start prefetch but don't await it - allows immediate navigation
    context.queryClient.prefetchQuery(pokemonQueryOptions);
  },
  component: PokemonPage,
});

// Pokemon type to color mapping
const TYPE_COLORS: Record<string, string> = {
  fire: 'red',
  water: 'blue',
  grass: 'green',
  electric: 'yellow',
  psychic: 'pink',
  ice: 'cyan',
  dragon: 'violet',
  dark: 'dark',
  fairy: 'pink',
  normal: 'gray',
  fighting: 'orange',
  flying: 'indigo',
  poison: 'grape',
  ground: 'orange',
  rock: 'gray',
  bug: 'lime',
  ghost: 'violet',
  steel: 'gray',
};

function PokemonContent() {
  const { data: pokemons } = useSuspenseQuery(pokemonQueryOptions);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
      {pokemons.map((pokemon) => {
        // Format Pokemon data
        const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        const id = `#${String(pokemon.id).padStart(3, '0')}`;
        const height = `${(pokemon.height / 10).toFixed(1)} m`;
        const weight = `${(pokemon.weight / 10).toFixed(1)} kg`;
        const imageUrl =
          pokemon.sprites.other?.['official-artwork']?.front_default ||
          pokemon.sprites.front_default ||
          '';
        const abilities = pokemon.abilities
          .filter((a) => !a.is_hidden)
          .map((a) => a.ability.name.replace('-', ' '))
          .join(', ');

        return (
          <Card
            key={pokemon.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ overflow: 'hidden' }}
          >
            <Stack gap="md">
              {/* Pokemon Image */}
              <Box
                style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  backgroundColor: 'var(--mantine-color-gray-0)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                )}
              </Box>

              {/* Pokemon Name & ID */}
              <Box>
                <Flex justify="space-between" align="center">
                  <Title order={4}>{name}</Title>
                  <Text size="sm" c="dimmed" fw={500}>
                    {id}
                  </Text>
                </Flex>
              </Box>

              {/* Type Badges */}
              <Flex gap="xs" wrap="wrap">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.slot}
                    color={TYPE_COLORS[type.type.name] || 'gray'}
                    variant="filled"
                    size="sm"
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </Flex>

              {/* Pokemon Stats */}
              <Stack gap="xs">
                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Height:
                  </Text>
                  <Text size="sm">{height}</Text>
                </Flex>

                <Flex gap="xs">
                  <Text size="sm" fw={500} c="dimmed">
                    Weight:
                  </Text>
                  <Text size="sm">{weight}</Text>
                </Flex>

                <Box>
                  <Text size="sm" fw={500} c="dimmed">
                    Abilities:
                  </Text>
                  <Text size="sm" style={{ textTransform: 'capitalize' }}>
                    {abilities || 'None'}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}

function PokemonPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      <Flex align="center" gap="md">
        <Zap size={32} />
        <Title order={2}>Pokemon</Title>
      </Flex>

      <Suspense fallback={<PokemonSkeleton />}>
        <PokemonContent />
      </Suspense>
    </Flex>
  );
}
