import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Options for the useInfiniteScroll hook
 */
export interface UseInfiniteScrollOptions {
  /** Whether there are more pages to fetch */
  hasNextPage: boolean;
  /** Whether the next page is currently being fetched */
  isFetchingNextPage: boolean;
  /** Function to call to fetch the next page */
  fetchNextPage: () => void;
  /** Threshold at which to trigger the intersection observer (default: 0) */
  threshold?: number;
  /** Root margin for the intersection observer (default: '100px') */
  rootMargin?: string;
}

/**
 * Custom hook for implementing infinite scroll with automatic fetching
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
 *   useInfiniteQuery(queryOptions);
 *
 * const { ref } = useInfiniteScroll({
 *   hasNextPage,
 *   isFetchingNextPage,
 *   fetchNextPage,
 * });
 *
 * return (
 *   <>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={ref} />
 *   </>
 * );
 * ```
 */
export function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0,
  rootMargin = '100px',
}: UseInfiniteScrollOptions) {
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref, inView };
}
