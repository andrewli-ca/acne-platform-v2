import { mockClient } from '@acme/api';
import { Avatar, Box, Group, Text, ThemeSwitcher } from '@acme/ui';

import styles from './Topbar.module.css';

export function Topbar() {
  const user = mockClient.getCurrentUser();

  return (
    <Box className={styles.topbar}>
      <Group justify="flex-end" style={{ width: '100%' }}>
        <Group gap="sm">
          <Avatar size="sm" radius="xl" color="blue">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
          <Text size="sm" fw={500}>
            {user?.name || 'User'}
          </Text>
          <ThemeSwitcher />
        </Group>
      </Group>
    </Box>
  );
}
