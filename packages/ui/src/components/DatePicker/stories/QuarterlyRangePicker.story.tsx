import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Box, Paper, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { DateFormat, differenceInDays, formatDate, getCurrentDate } from '@acme/utils/date';

import { QuarterlyRangePicker } from '../QuarterlyRangePicker';

const meta = {
  title: 'Components/DatePicker/QuarterlyRangePicker',
  component: QuarterlyRangePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          "A quarterly date range picker component that displays quarters grouped by year. Users can click on any quarter to select that quarter's date range.",
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
} satisfies Meta<typeof QuarterlyRangePicker>;

export default meta;
type Story = StoryObj<typeof QuarterlyRangePicker>;

// Helper component to manage state
function QuarterlyRangePickerWrapper({
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
  const maxDate = getCurrentDate();

  return (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Paper p="md" withBorder style={{ minHeight: 333 }}>
          <QuarterlyRangePicker
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
                ? formatDate(
                    startDate instanceof Date ? startDate : new Date(startDate),
                    DateFormat.SHORT
                  )
                : 'Not selected'}
            </Text>
            <Text size="sm" c="dimmed">
              End:{' '}
              {endDate
                ? formatDate(
                    endDate instanceof Date ? endDate : new Date(endDate),
                    DateFormat.SHORT
                  )
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
          Click on any quarter card to select that quarter's date range. The current quarter is
          indicated with a blue dot.
        </Text>
        <QuarterlyRangePickerWrapper />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default quarterly range picker displaying quarters grouped by year. Click any quarter to select its date range.',
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 800 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Quarterly range picker with a pre-selected quarter (Q1 2024).
        </Text>
        <QuarterlyRangePickerWrapper
          defaultStartDate={new Date(2024, 0, 1)}
          defaultEndDate={new Date(2024, 2, 31)}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Quarterly range picker with a pre-selected quarter range.',
      },
    },
  },
};

export const WithMinDate: Story = {
  render: () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return (
      <Box p="xl" style={{ maxWidth: 800 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            This example limits quarter selection to the past year. Quarters before one year ago are
            disabled.
          </Text>
          <QuarterlyRangePickerWrapper minDate={oneYearAgo} />
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quarterly range picker with a minimum date constraint. Quarters before the minDate are disabled.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<DateValue>(null);
    const [endDate, setEndDate] = useState<DateValue>(null);
    const maxDate = getCurrentDate();

    return (
      <Box p="xl" style={{ maxWidth: 800 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Interactive example. Click on any quarter to see the date range update.
          </Text>
          <Paper p="md" withBorder style={{ minHeight: 333 }}>
            <QuarterlyRangePicker
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
                  ? formatDate(
                      startDate instanceof Date ? startDate : new Date(startDate),
                      DateFormat.SHORT
                    )
                  : 'Not selected'}
              </Text>
              <Text size="sm" c="dimmed">
                End:{' '}
                {endDate
                  ? formatDate(
                      endDate instanceof Date ? endDate : new Date(endDate),
                      DateFormat.SHORT
                    )
                  : 'Not selected'}
              </Text>
              {startDate && endDate && (
                <Text size="xs" c="dimmed" mt="xs">
                  Range:{' '}
                  {differenceInDays(
                    endDate instanceof Date ? endDate : new Date(endDate),
                    startDate instanceof Date ? startDate : new Date(startDate)
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
        story: 'Interactive example demonstrating quarter selection and date range updates.',
      },
    },
  },
};
