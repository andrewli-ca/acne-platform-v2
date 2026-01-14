import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

import { pokemonClient } from '@acme/pokemon';

export const pokemonInfiniteQueryOptions = infiniteQueryOptions({
  queryKey: ['pokemon', 'list'],
  queryFn: ({ pageParam }) => pokemonClient.getPokemonsPaginated(20, pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextOffset,
  staleTime: 1000 * 60 * 60, // 1 hour - Pokemon data doesn't change often
});

/**
 * Query options for fetching top 10 Pokemon
 * Used to demonstrate Suspense with a simple, non-paginated query
 */
export const pokemonTableQueryOptions = queryOptions({
  queryKey: ['pokemon', 'top10'],
  queryFn: () => pokemonClient.getPokemons(10),
  staleTime: 1000 * 60 * 60, // 1 hour - Pokemon data doesn't change often
});

/**
 * Query options for fetching berries
 * Used to demonstrate concurrent loading with multiple Suspense boundaries
 */
export const berriesQueryOptions = queryOptions({
  queryKey: ['berries', 'list'],
  queryFn: () => pokemonClient.getBerries(20),
  staleTime: 1000 * 60 * 60, // 1 hour - Berry data doesn't change often
});
