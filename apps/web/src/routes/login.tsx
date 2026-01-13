import { useState } from 'react';

import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { mockClient } from '@acme/api';
import { Box, Button, Card, Flex, PasswordInput, Stack, Text, TextInput, Title } from '@acme/ui';

export const Route = createFileRoute('/login')({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await mockClient.login(email, password);
      navigate({ to: '/dashboard' });
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex align="center" justify="center" bg="blue">
      <Box style={{ width: '100%', maxWidth: '400px', padding: '1rem' }}>
        <Card shadow="md" padding="xl" radius="md" withBorder>
          <Stack gap="md">
            <div>
              <Title order={2}>Welcome Back</Title>
              <Text c="dimmed">Sign in to your dashboard</Text>
            </div>

            <form onSubmit={handleSubmit}>
              <Stack gap="md">
                <TextInput
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />

                <PasswordInput
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />

                {error && (
                  <Text size="sm" c="red">
                    {error}
                  </Text>
                )}

                <Button type="submit" fullWidth loading={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>

                <Text size="xs" c="dimmed" ta="center">
                  Hint: Use any email/password combination
                </Text>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Box>
    </Flex>
  );
}
