import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { Box, Paper, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { MonthlyRangePicker } from '../MonthlyRangePicker';

const meta = {
  title: 'Components/DatePicker/MonthlyRangePicker',
  component: MonthlyRangePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A monthly date range picker component that displays months grouped by year. Users can click on any month to select that month's date range.",
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: 'date',
      description: 'Selected start date',
    },
    endDate: {
      control: 'date',
      description: 'Selected end date',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    onChange: {
      action: 'rangeChanged',
      description: 'Callback when date range changes',
    },
  },
} satisfies Meta<typeof MonthlyRangePicker>;

export default meta;
type Story = StoryObj<typeof MonthlyRangePicker>;

// Helper component to manage state
function MonthlyRangePickerWrapper({
  defaultStartDate,
  defaultEndDate,
  minDate,
}: {
  defaultStartDate?: DateValue;
  defaultEndDate?: DateValue;
  minDate?: DateValue;
}) {
  const [startDate, setStartDate] = useState<DateValue>(defaultStartDate || null);
  const [endDate, setEndDate] = useState<DateValue>(defaultEndDate || null);
  const today = dayjs();
  const maxDate = today.toDate();

  return (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Paper p="md" withBorder style={{ minHeight: 333 }}>
          <MonthlyRangePicker
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(range) => {
              setStartDate(range.startDate);
              setEndDate(range.endDate);
            }}
          />
        </Paper>
        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Selected Range:
            </Text>
            <Text size="sm" c="dimmed">
              Start:{' '}
              {startDate
                ? dayjs(startDate instanceof Date ? startDate : new Date(startDate)).format(
                    'MMM D, YYYY'
                  )
                : 'Not selected'}
            </Text>
            <Text size="sm" c="dimmed">
              End:{' '}
              {endDate
                ? dayjs(endDate instanceof Date ? endDate : new Date(endDate)).format('MMM D, YYYY')
                : 'Not selected'}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export const Default: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Click on any month card to select that month's date range. The current month is indicated
          with a blue dot.
        </Text>
        <MonthlyRangePickerWrapper />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default monthly range picker displaying months grouped by year. Click any month to select its date range.',
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Monthly range picker with a pre-selected month (January 2024).
        </Text>
        <MonthlyRangePickerWrapper
          defaultStartDate={new Date(2024, 0, 1)}
          defaultEndDate={new Date(2024, 0, 31)}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Monthly range picker with a pre-selected month range.',
      },
    },
  },
};

export const WithMinDate: Story = {
  render: () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    return (
      <Box p="xl" style={{ maxWidth: 800 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            This example limits month selection to the past 6 months. Months before six months ago
            are disabled.
          </Text>
          <MonthlyRangePickerWrapper minDate={sixMonthsAgo} />
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Monthly range picker with a minimum date constraint. Months before the minDate are disabled.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<DateValue>(null);
    const [endDate, setEndDate] = useState<DateValue>(null);
    const today = dayjs();
    const maxDate = today.toDate();

    return (
      <Box p="xl" style={{ maxWidth: 800 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Interactive example. Click on any month to see the date range update.
          </Text>
          <Paper p="md" withBorder style={{ minHeight: 333 }}>
            <MonthlyRangePicker
              startDate={startDate}
              endDate={endDate}
              maxDate={maxDate}
              onChange={(range) => {
                setStartDate(range.startDate);
                setEndDate(range.endDate);
              }}
            />
          </Paper>
          <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 8 }}>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Selected Range:
              </Text>
              <Text size="sm" c="dimmed">
                Start:{' '}
                {startDate
                  ? dayjs(startDate instanceof Date ? startDate : new Date(startDate)).format(
                      'MMM D, YYYY'
                    )
                  : 'Not selected'}
              </Text>
              <Text size="sm" c="dimmed">
                End:{' '}
                {endDate
                  ? dayjs(endDate instanceof Date ? endDate : new Date(endDate)).format(
                      'MMM D, YYYY'
                    )
                  : 'Not selected'}
              </Text>
              {startDate && endDate && (
                <Text size="xs" c="dimmed" mt="xs">
                  Range:{' '}
                  {Math.ceil(
                    (dayjs(endDate instanceof Date ? endDate : new Date(endDate)).valueOf() -
                      dayjs(
                        startDate instanceof Date ? startDate : new Date(startDate)
                      ).valueOf()) /
                      (1000 * 60 * 60 * 24)
                  )}{' '}
                  days
                </Text>
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
        story: 'Interactive example demonstrating month selection and date range updates.',
      },
    },
  },
};
