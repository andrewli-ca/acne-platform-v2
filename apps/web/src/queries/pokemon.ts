import { queryOptions } from '@tanstack/react-query';

import { pokemonClient } from '@acme/pokemon';

export const pokemonQueryOptions = queryOptions({
  queryKey: ['pokemon', 'list'],
  queryFn: () => pokemonClient.getPokemons(20),
  staleTime: 1000 * 60 * 60, // 1 hour - Pokemon data doesn't change often
});
