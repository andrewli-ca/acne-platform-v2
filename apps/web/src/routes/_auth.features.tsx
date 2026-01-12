import { createFileRoute } from '@tanstack/react-router';
import { Title, Flex, Box, SimpleGrid, FeatureCard } from '@acme/ui';
import {
  LayoutDashboard,
  CreditCard,
  Shield,
  Zap,
  Users,
  BarChart3,
} from 'lucide-react';

export const Route = createFileRoute('/_auth/features')({
  component: FeaturesPage,
});

const features = [
  {
    title: 'Real-time Dashboard',
    description:
      'Monitor your key metrics in real-time with our comprehensive dashboard.',
    icon: <LayoutDashboard size={24} />,
    color: 'blue',
  },
  {
    title: 'Transaction Management',
    description:
      'Track and manage all your transactions with detailed filtering and search.',
    icon: <CreditCard size={24} />,
    color: 'green',
  },
  {
    title: 'Secure Authentication',
    description:
      'Enterprise-grade security with multi-factor authentication support.',
    icon: <Shield size={24} />,
    color: 'violet',
  },
  {
    title: 'Lightning Fast',
    description:
      'Optimized performance with automatic code-splitting and prefetching.',
    icon: <Zap size={24} />,
    color: 'yellow',
  },
  {
    title: 'Team Collaboration',
    description:
      'Invite team members and collaborate with role-based access control.',
    icon: <Users size={24} />,
    color: 'cyan',
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain insights with detailed reports and data visualizations.',
    icon: <BarChart3 size={24} />,
    color: 'orange',
  },
];

function FeaturesPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      <Box>
        <Title order={2}>Features</Title>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
