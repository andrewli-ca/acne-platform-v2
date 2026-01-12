import { queryOptions } from '@tanstack/react-query';
import { mockClient } from '@acme/api';

export const transactionsQueryOptions = queryOptions({
  queryKey: ['transactions'],
  queryFn: () => mockClient.getTransactions(),
});

export const transactionByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['transactions', id],
    queryFn: () => mockClient.getTransactionById(id),
  });
