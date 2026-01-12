import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import { Maximize2, X } from 'lucide-react';

import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Drawer as MantineDrawer,
  Title,
  type DrawerProps as MantineDrawerProps,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import styles from './Drawer.module.css';

export interface DrawerProps extends Omit<MantineDrawerProps, 'opened' | 'onClose' | 'position'> {
  /** Whether the drawer is open */
  opened: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Title to display in the drawer header */
  title?: ReactNode;
  /** Default width of the drawer (default: 400px) */
  defaultWidth?: number;
  /** Minimum width of the drawer (default: 200px) */
  minWidth?: number;
  /** Maximum width of the drawer (default: 90% of viewport) */
  maxWidth?: number;
  /** Whether to close the drawer when focus is outside of the drawer */
  closeOnFocusOutside?: boolean;
  /** Actions to render in the top right corner of the drawer */
  topRightActions?: ReactNode;
  /** Test ID for UI testing */
  testId?: string;
  /** Children to render inside the drawer */
  children: ReactNode;
}

/**
 * Drawer component with resize functionality
 * Opens from the right by default, can be resized by dragging, and includes full-width controls
 * On small screens (md breakpoint and below), opens full screen and hides resize controls
 */
export function Drawer({
  opened,
  onClose,
  title,
  defaultWidth = 400,
  minWidth = 200,
  maxWidth,
  children,
  closeOnFocusOutside = false,
  topRightActions,
  testId,
  ...props
}: DrawerProps) {
  const isSmallScreen = useMediaQuery('(max-width: 64em)'); // md breakpoint (breakpoint 3) and below
  const [width, setWidth] = useState(defaultWidth);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);

  // Calculate max width if not provided (in pixels for clamping calculations)
  const effectiveMaxWidth =
    maxWidth ?? (typeof window !== 'undefined' ? window.innerWidth * 0.9 : 1200);

  // Reset state when drawer closes
  useEffect(() => {
    if (!opened) {
      setWidth(defaultWidth);
      setIsFullWidth(false);
      setIsResizing(false);
    }
  }, [opened, defaultWidth]);

  // Reset width when drawer opens
  useEffect(() => {
    if (opened && !isSmallScreen) {
      if (isFullWidth) {
        // Full width uses 100vw, but we don't need to set numeric width for it
        // since drawerWidth will use '100vw' string
      } else {
        setWidth(defaultWidth);
      }
    }
  }, [opened, isSmallScreen, isFullWidth, defaultWidth]);

  // Handle mouse down on resize handle
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isSmallScreen || isFullWidth) {
        return;
      }
      e.preventDefault();
      setIsResizing(true);
    },
    [isSmallScreen, isFullWidth]
  );

  // Handle mouse move for resizing
  useEffect(() => {
    if (!isResizing) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!drawerRef.current) {
        return;
      }

      const newWidth = window.innerWidth - e.clientX;

      // Clamp width between min and max
      const clampedWidth = Math.max(minWidth, Math.min(newWidth, effectiveMaxWidth));
      setWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, minWidth, effectiveMaxWidth]);

  // Handle full width toggle
  const handleFullWidth = useCallback(() => {
    if (isFullWidth) {
      setIsFullWidth(false);
      setWidth(defaultWidth);
    } else {
      setIsFullWidth(true);
      // Full width uses 100vw, no need to set numeric width
    }
  }, [isFullWidth, defaultWidth]);

  // Determine drawer width based on state
  const drawerWidth = isSmallScreen ? '100vw' : isFullWidth ? '100vw' : width;

  return (
    <MantineDrawer
      {...props}
      opened={opened}
      onClose={onClose}
      position="right"
      size={drawerWidth}
      className={styles.drawer}
      withCloseButton={false}
      closeOnClickOutside={closeOnFocusOutside}
      closeOnEscape={closeOnFocusOutside}
      pos="relative"
      padding={0}
      ref={drawerRef}
    >
      <div data-testid={testId}>
        {/* Resize handle - only visible on larger screens when not full width */}
        {!isSmallScreen && !isFullWidth && (
          <Box
            ref={resizeHandleRef}
            className={`${styles.resizeHandle} ${isResizing ? styles.resizing : ''}`}
            onMouseDown={handleMouseDown}
          />
        )}

        {/* Header */}
        <Flex align="center" justify="space-between" pos="sticky" top={0} bg="white">
          <Group gap="xs">
            {/* Full width button - only on larger screens */}
            {!isSmallScreen && (
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={handleFullWidth}
                title={isFullWidth ? 'Restore default width' : 'Make full width'}
                data-testid="expand-drawer-button"
              >
                <Maximize2 size={16} />
              </ActionIcon>
            )}

            {/* Close button */}
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={onClose}
              title="Close drawer"
              data-testid="close-drawer-button"
            >
              <X size={16} />
            </ActionIcon>
          </Group>
          {topRightActions}
        </Flex>

        {/* Content */}
        <Box px="md" pt="md">
          {title && <Title order={4}>{title}</Title>}
          {children}
        </Box>
      </div>
    </MantineDrawer>
  );
}
