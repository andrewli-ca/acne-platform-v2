import { useCallback, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Box, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { DateFormat, formatDate, getDayOfMonth, getMonth, getYear } from '@acme/utils/date';

import { DateInput, type DateInputProps } from '../DateInput';

const meta = {
  title: 'Components/DatePicker/DateInput',
  component: DateInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A segmented date input component that allows users to edit day, month, and year individually. Each segment can be clicked and edited separately, with auto-advance when a segment is complete.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'date',
      description: 'The current date value',
    },
    onChange: {
      action: 'dateChanged',
      description: 'Callback when the date changes',
    },
  },
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof DateInput>;

// Helper component to manage date input state
function DateInputWrapper({
  defaultDate,
  children,
  ...props
}: Omit<DateInputProps, 'date' | 'onChange'> & {
  defaultDate?: DateValue;
  children?: React.ReactNode;
}) {
  const [date, setDate] = useState<DateValue>(defaultDate || null);

  const handleDateChange = useCallback((newDate: DateValue | null) => {
    setDate(newDate);
  }, []);

  const dateAsDate = date instanceof Date ? date : date ? new Date(date) : null;

  return (
    <Box p="xl" style={{ maxWidth: 400 }}>
      <Stack gap="md">
        {children}
        <DateInput date={dateAsDate} onChange={handleDateChange} {...props} />
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Selected Date:
            </Text>
            <Text size="sm" c="dimmed">
              {date
                ? formatDate(date instanceof Date ? date : new Date(date), DateFormat.LONG)
                : 'No date selected'}
            </Text>
            {date && (
              <Text size="xs" c="dimmed" mt="xs">
                ISO: {(date instanceof Date ? date : new Date(date)).toISOString()}
              </Text>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => (
    <DateInputWrapper>
      <Text size="sm" c="dimmed">
        Empty DateInput with placeholders. Click on any segment (DD, MM, YYYY) to start editing.
      </Text>
    </DateInputWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default empty state showing placeholders for day (DD), month (MM), and year (YYYY). Click on any segment to focus and edit it individually.',
      },
    },
  },
};

export const WithInitialDate: Story = {
  render: () => (
    <DateInputWrapper defaultDate={new Date(2026, 0, 6)}>
      <Text size="sm" c="dimmed">
        DateInput with an initial date value. Each segment can still be edited independently.
      </Text>
    </DateInputWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'DateInput initialized with a date value. The date is displayed in the segmented format, and each segment remains individually editable.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [date, setDate] = useState<DateValue>(new Date(2024, 5, 15));

    const handleDateChange = useCallback((newDate: DateValue | null) => {
      setDate(newDate);
    }, []);

    const dateAsDate = date instanceof Date ? date : date ? new Date(date) : null;

    return (
      <Box p="xl" style={{ maxWidth: 400 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Interactive example. Try clicking on different segments, using arrow keys to navigate,
            and typing dates. The component auto-advances when a segment is complete (e.g., after
            typing 2 digits for day or month).
          </Text>
          <DateInput date={dateAsDate} onChange={handleDateChange} />
          <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Selected Date:
              </Text>
              <Text size="sm" c="dimmed">
                {date
                  ? formatDate(date instanceof Date ? date : new Date(date), DateFormat.LONG)
                  : 'No date selected'}
              </Text>
              {date && (
                <>
                  <Text size="xs" c="dimmed" mt="xs">
                    ISO: {(date instanceof Date ? date : new Date(date)).toISOString()}
                  </Text>
                  <Text size="xs" c="dimmed">
                    Day: {getDayOfMonth(date instanceof Date ? date : new Date(date))} | Month:{' '}
                    {getMonth(date instanceof Date ? date : new Date(date)) + 1} | Year:{' '}
                    {getYear(date instanceof Date ? date : new Date(date))}
                  </Text>
                </>
              )}
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example demonstrating all features including keyboard navigation, auto-advance, and individual segment editing.',
      },
    },
  },
};

export const DifferentDates: Story = {
  render: () => (
    <Box p="xl">
      <Stack gap="xl">
        <Text size="sm" c="dimmed">
          Examples with different date values:
        </Text>
        <Stack gap="lg">
          <Box>
            <Text size="sm" fw={600} mb="xs">
              Today
            </Text>
            <DateInputWrapper defaultDate={new Date()}>
              <Text size="xs" c="dimmed">
                Current date
              </Text>
            </DateInputWrapper>
          </Box>
          <Box>
            <Text size="sm" fw={600} mb="xs">
              January 1, 2024
            </Text>
            <DateInputWrapper defaultDate={new Date(2024, 0, 1)}>
              <Text size="xs" c="dimmed">
                New Year's Day
              </Text>
            </DateInputWrapper>
          </Box>
          <Box>
            <Text size="sm" fw={600} mb="xs">
              December 31, 2025
            </Text>
            <DateInputWrapper defaultDate={new Date(2025, 11, 31)}>
              <Text size="xs" c="dimmed">
                End of year
              </Text>
            </DateInputWrapper>
          </Box>
          <Box>
            <Text size="sm" fw={600} mb="xs">
              February 29, 2024 (Leap Year)
            </Text>
            <DateInputWrapper defaultDate={new Date(2024, 1, 29)}>
              <Text size="xs" c="dimmed">
                Leap year date
              </Text>
            </DateInputWrapper>
          </Box>
        </Stack>
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple examples showing the DateInput component with different date values, including edge cases like leap years.',
      },
    },
  },
};

export const EmptyState: Story = {
  render: () => (
    <DateInputWrapper defaultDate={null}>
      <Text size="sm" c="dimmed">
        Empty state with null date. All segments show placeholders. When you start typing, the
        component will construct a valid date.
      </Text>
    </DateInputWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty state demonstrating the placeholder behavior when no date is set. Users can start typing in any segment to begin entering a date.',
      },
    },
  },
};
