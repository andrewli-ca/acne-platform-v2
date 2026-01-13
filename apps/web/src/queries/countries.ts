import { queryOptions } from '@tanstack/react-query';

import { countriesClient } from '@acme/countries';

export const countriesQueryOptions = queryOptions({
  queryKey: ['countries', 'list'],
  queryFn: () => countriesClient.getCountries(10),
  staleTime: 1000 * 60 * 60, // 1 hour - countries data doesn't change often
});
