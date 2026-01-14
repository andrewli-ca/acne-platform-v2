import { Suspense, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

import type { Transaction } from '@acme/api';
import {
  Badge,
  Box,
  Button,
  DataDialog,
  Flex,
  Stack,
  Table,
  TableCard,
  Text,
  Title,
} from '@acme/ui';

import { TableSkeleton } from '@/components/TableSkeleton';
import { transactionsQueryOptions } from '@/queries/transactions';

export const Route = createFileRoute('/_auth/transactions')({
  loader: ({ context }) => {
    // Start prefetch but don't await it - allows immediate navigation
    context.queryClient.prefetchQuery(transactionsQueryOptions);
  },
  component: TransactionsPage,
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

function getStatusColor(status: Transaction['status']): string {
  switch (status) {
    case 'completed':
      return 'green';
    case 'pending':
      return 'yellow';
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
}

function TransactionsContent() {
  const { data: transactions } = useSuspenseQuery(transactionsQueryOptions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  return (
    <>
      <TableCard>
        <Table.ScrollContainer minWidth={800}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Recipient</Table.Th>
                <Table.Th>Amount</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {transactions.map((transaction) => (
                <Table.Tr key={transaction.id}>
                  <Table.Td>{transaction.date}</Table.Td>
                  <Table.Td>{transaction.recipient}</Table.Td>
                  <Table.Td>{formatCurrency(transaction.amount)}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(transaction.status)} variant="light">
                      {transaction.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="subtle"
                      size="xs"
                      onClick={() => setSelectedTransaction(transaction)}
                    >
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </TableCard>

      <DataDialog
        open={!!selectedTransaction}
        onOpenChange={(open) => !open && setSelectedTransaction(null)}
        title="Transaction Details"
        description={`Details for transaction ${selectedTransaction?.id}`}
      >
        {selectedTransaction && (
          <Stack gap="sm">
            <Flex justify="space-between">
              <Text fw={500}>ID:</Text>
              <Text>{selectedTransaction.id}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw={500}>Date:</Text>
              <Text>{selectedTransaction.date}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw={500}>Recipient:</Text>
              <Text>{selectedTransaction.recipient}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw={500}>Amount:</Text>
              <Text>{formatCurrency(selectedTransaction.amount)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw={500}>Category:</Text>
              <Text>{selectedTransaction.category}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text fw={500}>Status:</Text>
              <Badge color={getStatusColor(selectedTransaction.status)} variant="light">
                {selectedTransaction.status}
              </Badge>
            </Flex>
            {selectedTransaction.memo && (
              <Flex justify="space-between">
                <Text fw={500}>Memo:</Text>
                <Text>{selectedTransaction.memo}</Text>
              </Flex>
            )}
          </Stack>
        )}
      </DataDialog>
    </>
  );
}

function TransactionsPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      <Box>
        <Title order={2}>Transactions</Title>
      </Box>

      <Suspense fallback={<TableSkeleton />}>
        <TransactionsContent />
      </Suspense>
    </Flex>
  );
}
