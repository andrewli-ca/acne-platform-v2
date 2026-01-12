// UI package public API - Explicit named exports only

// Theme
export { ThemeProvider } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

// Components
export { StatCard } from './components/StatCard';
export type { StatCardProps } from './components/StatCard';
export { DataDialog } from './components/DataDialog';
export type { DataDialogProps } from './components/DataDialog';
export { FeatureCard } from './components/FeatureCard';
export type { FeatureCardProps } from './components/FeatureCard';
export { TestButton } from './components/TestButton';
export type { TestButtonProps } from './components/TestButton';

// Re-export Mantine primitives for layout and typography
export {
  Flex,
  Box,
  Grid,
  Container,
  Text,
  Title,
  Table,
  Badge,
  Modal,
  Divider,
  Card,
  Button,
  Skeleton,
  TextInput,
  PasswordInput,
  Stack,
  Group,
  Avatar,
  NavLink,
  ActionIcon,
  SimpleGrid,
} from '@mantine/core';
