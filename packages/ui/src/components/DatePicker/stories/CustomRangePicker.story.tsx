import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { Box, Paper, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { CustomRangePicker } from '../CustomRangePicker';
import type { DateRange } from '../types';

const meta = {
  title: 'Components/DatePicker/CustomRangePicker',
  component: CustomRangePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A custom date range picker component using Mantine DatePicker with 2 columns for precise date range selection. Users can navigate months and select date ranges.',
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
} satisfies Meta<typeof CustomRangePicker>;

export default meta;
type Story = StoryObj<typeof CustomRangePicker>;

// Helper component to manage state
function CustomRangePickerWrapper({
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

  const handleChange = (range: DateRange) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  };

  return (
    <Box p="xl" style={{ maxWidth: 1000 }}>
      <Stack gap="md">
        <Paper p="md" withBorder style={{ minHeight: 333 }}>
          <CustomRangePicker
            startDate={startDate}
            endDate={endDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={handleChange}
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
            {startDate && endDate && (
              <Text size="xs" c="dimmed" mt="xs">
                Range:{' '}
                {Math.ceil(
                  (dayjs(endDate instanceof Date ? endDate : new Date(endDate)).valueOf() -
                    dayjs(startDate instanceof Date ? startDate : new Date(startDate)).valueOf()) /
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
}

export const Default: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 1000 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Custom range picker using Mantine DatePicker with 2 columns. Click on dates to select a
          date range. Navigate between months using the built-in controls.
        </Text>
        <CustomRangePickerWrapper />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default custom range picker using Mantine DatePicker with 2 columns. Select dates to create a custom date range.',
      },
    },
  },
};

export const WithSelection: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 1000 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Custom range picker with a pre-selected date range (January 15 - February 20, 2024).
        </Text>
        <CustomRangePickerWrapper
          defaultStartDate={new Date(2024, 0, 15)}
          defaultEndDate={new Date(2024, 1, 20)}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom range picker with a pre-selected date range.',
      },
    },
  },
};

export const WithMinDate: Story = {
  render: () => {
    const oneYearAgo = dayjs().subtract(1, 'year').toDate();

    return (
      <Box p="xl" style={{ maxWidth: 1000 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            This example limits date selection to the past year. Dates before one year ago are
            disabled.
          </Text>
          <CustomRangePickerWrapper minDate={oneYearAgo} />
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Custom range picker with a minimum date constraint. Dates before the minDate are disabled.',
      },
    },
  },
};

export const WithLongRange: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 1000 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Custom range picker with a longer date range (6 months). The selected range is highlighted
          in the DatePicker.
        </Text>
        <CustomRangePickerWrapper
          defaultStartDate={new Date(2024, 0, 1)}
          defaultEndDate={new Date(2024, 5, 30)}
        />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom range picker demonstrating a longer date range selection.',
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

    const handleChange = (range: DateRange) => {
      setStartDate(range.startDate);
      setEndDate(range.endDate);
    };

    return (
      <Box p="xl" style={{ maxWidth: 1000 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Interactive example. Click on dates in the calendar to select a range. The DatePicker
            displays two columns for easy navigation.
          </Text>
          <Paper p="md" withBorder style={{ minHeight: 333 }}>
            <CustomRangePicker
              startDate={startDate}
              endDate={endDate}
              maxDate={maxDate}
              onChange={handleChange}
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
        story:
          'Interactive example demonstrating date selection, month navigation, and date range updates.',
      },
    },
  },
};
