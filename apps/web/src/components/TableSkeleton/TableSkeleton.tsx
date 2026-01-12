import { Table, Skeleton } from '@acme/ui';

export function TableSkeleton() {
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table striped>
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
          {[1, 2, 3, 4, 5].map((i) => (
            <Table.Tr key={i}>
              <Table.Td>
                <Skeleton height={16} width="80px" />
              </Table.Td>
              <Table.Td>
                <Skeleton height={16} width="120px" />
              </Table.Td>
              <Table.Td>
                <Skeleton height={16} width="80px" />
              </Table.Td>
              <Table.Td>
                <Skeleton height={20} width="70px" />
              </Table.Td>
              <Table.Td>
                <Skeleton height={24} width="50px" />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
