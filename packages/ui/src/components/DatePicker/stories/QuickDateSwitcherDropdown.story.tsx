import type { Meta, StoryObj } from '@storybook/react';

import { Box, Stack, Text } from '@mantine/core';

import { QuickDateSwitcherDropdown } from '../QuickDateSwitcherDropdown';

const meta = {
  title: 'Components/DatePicker/QuickDateSwitcherDropdown',
  component: QuickDateSwitcherDropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A dropdown component that combines a button trigger with a Popover containing a DatePicker. Provides a convenient way to add date range selection to any interface. The component manages its own internal state for the selected date range.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof QuickDateSwitcherDropdown>;

export default meta;
type Story = StoryObj<typeof QuickDateSwitcherDropdown>;

export const Default: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed" mb="md">
          Click the button to open the date picker dropdown. The dropdown contains a full DatePicker
          component with all three selection modes (Quarterly, Monthly, Custom) and Quick Picks
          shortcuts.
        </Text>
        <QuickDateSwitcherDropdown />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default QuickDateSwitcherDropdown with a button trigger. Click the button to open a popover containing the DatePicker component.',
      },
    },
  },
};

export const BasicUsage: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Simple usage example. Click the button to open the date picker and select a date range.
        </Text>
        <QuickDateSwitcherDropdown />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic usage of the QuickDateSwitcherDropdown component.',
      },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 1200 }}>
      <Stack gap="lg">
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
          <Stack gap="md">
            <Text size="lg" fw={600}>
              Dashboard Header
            </Text>
            <Text size="sm" c="dimmed">
              Use the date switcher to filter data by date range.
            </Text>
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <QuickDateSwitcherDropdown />
            </Box>
          </Stack>
        </Box>
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
          <Text size="sm" c="dimmed">
            Dashboard content would appear here. The date range selected in the dropdown above would
            filter this content.
          </Text>
        </Box>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Example of QuickDateSwitcherDropdown used in a dashboard context, positioned in a header section.',
      },
    },
  },
};

export const MultipleInstances: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 1200 }}>
      <Stack gap="lg">
        <Text size="sm" c="dimmed">
          Multiple instances of QuickDateSwitcherDropdown can be used on the same page. Each
          instance maintains its own state.
        </Text>
        <Box
          p="md"
          style={{
            border: '1px solid var(--mantine-color-gray-3)',
            borderRadius: 8,
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <QuickDateSwitcherDropdown />
          <QuickDateSwitcherDropdown />
          <QuickDateSwitcherDropdown />
        </Box>
        <Text size="xs" c="dimmed">
          Note: Each dropdown operates independently with its own date selection state.
        </Text>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of multiple QuickDateSwitcherDropdown instances on the same page, each maintaining independent state.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Interactive example. Click the button to open the date picker dropdown. Try different
          selection modes (Quarterly, Monthly, Custom) and use the Quick Picks shortcuts to quickly
          select common date ranges.
        </Text>
        <QuickDateSwitcherDropdown />
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Usage Tips:
            </Text>
            <Text size="xs" c="dimmed">
              • Click the button to open the date picker
            </Text>
            <Text size="xs" c="dimmed">
              • Use Quarterly mode to select by quarter
            </Text>
            <Text size="xs" c="dimmed">
              • Use Monthly mode to select by month
            </Text>
            <Text size="xs" c="dimmed">
              • Use Custom mode for precise date selection
            </Text>
            <Text size="xs" c="dimmed">
              • Use Quick Picks sidebar for common ranges like "This Month" or "Last Quarter"
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example demonstrating all features of the QuickDateSwitcherDropdown including mode switching and quick picks.',
      },
    },
  },
};
