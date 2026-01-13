import { Suspense } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Globe } from 'lucide-react';

import { Box, Card, Flex, SimpleGrid, Stack, Text, Title } from '@acme/ui';

import { CountriesSkeleton } from '@/components/CountriesSkeleton';
import { countriesQueryOptions } from '@/queries/countries';

export const Route = createFileRoute('/_auth/countries')({
  loader: ({ context }) => {
    // Start prefetch but don't await it - allows immediate navigation
    context.queryClient.prefetchQuery(countriesQueryOptions);
  },
  component: CountriesPage,
});

function CountriesContent() {
  const { data: countries } = useSuspenseQuery(countriesQueryOptions);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
      {countries.map((country) => {
        const capital = country.capital?.[0] || 'N/A';
        const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
        const population = country.population.toLocaleString();

        return (
          <Card
            key={country.cca3}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ overflow: 'hidden' }}
          >
            <Stack gap="md">
              {/* Flag Image */}
              <Box
                style={{
                  width: '100%',
                  height: '120px',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  backgroundColor: 'var(--mantine-color-gray-1)',
                }}
              >
                <img
                  src={country.flags.png}
                  alt={country.flags.alt || `Flag of ${country.name.common}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>

              {/* Country Name */}
              <Title order={4} style={{ marginTop: '0.5rem' }}>
                {country.name.common}
              </Title>

              {/* Country Details */}
              <Stack gap="xs">
                <Flex gap="xs" align="center">
                  <Text size="sm" fw={500} c="dimmed">
                    Capital:
                  </Text>
                  <Text size="sm">{capital}</Text>
                </Flex>

                <Flex gap="xs" align="center">
                  <Text size="sm" fw={500} c="dimmed">
                    Region:
                  </Text>
                  <Text size="sm">{country.region}</Text>
                </Flex>

                <Flex gap="xs" align="center">
                  <Text size="sm" fw={500} c="dimmed">
                    Population:
                  </Text>
                  <Text size="sm">{population}</Text>
                </Flex>

                <Box>
                  <Text size="sm" fw={500} c="dimmed">
                    Languages:
                  </Text>
                  <Text size="sm" lineClamp={2} title={languages}>
                    {languages}
                  </Text>
                </Box>
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}

function CountriesPage() {
  return (
    <Flex direction="column" gap="xl" style={{ maxWidth: '1400px', width: '100%' }}>
      <Flex align="center" gap="md">
        <Globe size={32} />
        <Title order={2}>Countries</Title>
      </Flex>

      <Suspense fallback={<CountriesSkeleton />}>
        <CountriesContent />
      </Suspense>
    </Flex>
  );
}
