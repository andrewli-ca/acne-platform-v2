import { queryOptions } from '@tanstack/react-query';

import { mockClient } from '@acme/api';

export const dashboardQueryOptions = queryOptions({
  queryKey: ['dashboard', 'stats'],
  queryFn: () => mockClient.getDashboardStats(),
});
