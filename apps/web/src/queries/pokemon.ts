import { infiniteQueryOptions } from '@tanstack/react-query';

import { pokemonClient } from '@acme/pokemon';

export const pokemonInfiniteQueryOptions = infiniteQueryOptions({
  queryKey: ['pokemon', 'list'],
  queryFn: ({ pageParam }) => pokemonClient.getPokemonsPaginated(20, pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextOffset,
  staleTime: 1000 * 60 * 60, // 1 hour - Pokemon data doesn't change often
});
