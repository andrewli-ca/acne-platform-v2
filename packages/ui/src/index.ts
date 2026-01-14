// UI package public API - Explicit named exports only

// Theme
export { ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

// Components
export { DataDialog } from './components/DataDialog';
export type { DataDialogProps } from './components/DataDialog';
export { Drawer } from './components/Drawer/Drawer';
export type { DrawerProps } from './components/Drawer/Drawer';
export { FeatureCard } from './components/FeatureCard';
export type { FeatureCardProps } from './components/FeatureCard';
export { InfiniteScrollSentinel } from './components/InfiniteScrollSentinel';
export type { InfiniteScrollSentinelProps } from './components/InfiniteScrollSentinel';
export { StatCard } from './components/StatCard';
export type { StatCardProps } from './components/StatCard';

// Hooks
export { useInfiniteScroll } from './hooks/useInfiniteScroll';
export type { UseInfiniteScrollOptions } from './hooks/useInfiniteScroll';

// Re-export Mantine primitives for layout and typography
export {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Loader,
  Modal,
  NavLink,
  PasswordInput,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
