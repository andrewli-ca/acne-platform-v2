import { Flex, Loader, Text } from '@mantine/core';

/**
 * Props for the InfiniteScrollSentinel component
 */
export interface InfiniteScrollSentinelProps {
  /** Ref to attach to the sentinel element for intersection observation */
  sentinelRef: (node?: Element | null) => void;
  /** Whether the next page is currently being fetched */
  isFetchingNextPage: boolean;
  /** Custom loading message (default: 'Loading more...') */
  loadingMessage?: string;
  /** Size of the loader spinner (default: 'md') */
  loaderSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Component that renders an invisible sentinel element for infinite scroll
 * and displays a loading indicator while fetching more data
 *
 * @example
 * ```tsx
 * const { ref } = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });
 *
 * return (
 *   <>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <InfiniteScrollSentinel
 *       sentinelRef={ref}
 *       isFetchingNextPage={isFetchingNextPage}
 *       loadingMessage="Loading more items..."
 *     />
 *   </>
 * );
 * ```
 */
export function InfiniteScrollSentinel({
  sentinelRef,
  isFetchingNextPage,
  loadingMessage = 'Loading more...',
  loaderSize = 'md',
}: InfiniteScrollSentinelProps) {
  return (
    <>
      {/* Invisible sentinel element that triggers intersection observer */}
      <div ref={sentinelRef} style={{ height: '20px' }} />

      {/* Loading indicator shown while fetching next page */}
      {isFetchingNextPage && (
        <Flex justify="center" align="center" gap="sm" py="xl">
          <Loader size={loaderSize} type="dots" />
          <Text size="sm" c="dimmed" fw={500}>
            {loadingMessage}
          </Text>
        </Flex>
      )}
    </>
  );
}
