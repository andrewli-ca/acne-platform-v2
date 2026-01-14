import { useSuspenseQuery } from '@tanstack/react-query';

import type { Pokemon } from '@acme/pokemon';
import { Badge, Flex, Table, TableCard, Text } from '@acme/ui';

import { pokemonTableQueryOptions } from '@/queries/pokemon';

/**
 * Pokemon Table Component
 * Wrapped in its own Suspense boundary - loads independently
 */
export function PokemonTable() {
  // useSuspenseQuery will suspend this component until data is ready
  const { data: pokemons } = useSuspenseQuery(pokemonTableQueryOptions);

  return (
    <TableCard>
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
    </TableCard>
  );
}
