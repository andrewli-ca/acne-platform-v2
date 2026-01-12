import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { mockClient } from '@acme/api';
import { Flex, Box } from '@acme/ui';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    // Check authentication before loading protected routes
    if (!mockClient.isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <Flex style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Flex direction="column" style={{ flex: 1 }}>
        <Topbar />
        <Box
          style={{
            flex: 1,
            padding: '1.5rem',
            background: 'var(--mantine-color-gray-0)',
          }}
        >
          <Outlet />
        </Box>
      </Flex>
    </Flex>
  );
}
