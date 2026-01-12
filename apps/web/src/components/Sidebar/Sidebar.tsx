import { Link, useLocation } from '@tanstack/react-router';
import { CreditCard, LayoutDashboard, LogOut, Sparkles } from 'lucide-react';

import { mockClient } from '@acme/api';
import { Box, NavLink, Stack, Text } from '@acme/ui';

import styles from './Sidebar.module.css';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: CreditCard },
  { to: '/features', label: 'Features', icon: Sparkles },
] as const;

export function Sidebar() {
  const location = useLocation();

  const handleLogout = async () => {
    await mockClient.logout();
    window.location.href = '/login';
  };

  return (
    <Box className={styles.sidebar}>
      <Stack gap="md" style={{ height: '100%' }}>
        {/* Logo/Brand */}
        <Box className={styles.brand}>
          <Text fw={700} size="lg">
            Acme Platform
          </Text>
        </Box>

        {/* Navigation */}
        <Stack gap="xs" style={{ flex: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <NavLink
                key={item.to}
                component={Link}
                to={item.to}
                label={item.label}
                leftSection={<Icon size={18} />}
                active={isActive}
                variant="light"
              />
            );
          })}
        </Stack>

        {/* Logout */}
        <NavLink
          label="Logout"
          leftSection={<LogOut size={18} />}
          onClick={handleLogout}
          variant="subtle"
          color="red"
        />
      </Stack>
    </Box>
  );
}
