import '@mantine/core/styles.css';

import { StrictMode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';

import { Center, Loader } from '@acme/ui';

// Import the generated route tree
import { routeTree } from './routeTree.gen';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Create the router with context
const router = createRouter({
  routeTree,
  defaultPendingComponent: () => (
    <Center h="100%" mih="100vh">
      <Loader size="lg" />
    </Center>
  ),
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadDelay: 100,
  defaultPendingMs: 1000,
  defaultPendingMinMs: 500,
});

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
