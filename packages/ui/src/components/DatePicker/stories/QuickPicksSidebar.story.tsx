import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { Box, Flex, Paper, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { QuickPicksSidebar } from '../QuickPicksSidebar';
import type { DatePickerRangeType, DateRange } from '../types';

const meta = {
  title: 'Components/DatePicker/QuickPicksSidebar',
  component: QuickPicksSidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A sidebar component providing quick pick shortcuts for common date ranges. Includes options like "This Month", "Last Quarter", "All Time", and recent quarters.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    minDate: {
      control: 'date',
      description: 'Minimum selectable date (used for "All Time" option)',
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
} satisfies Meta<typeof QuickPicksSidebar>;

export default meta;
type Story = StoryObj<typeof QuickPicksSidebar>;

// Helper component to manage state and display results
function QuickPicksSidebarWrapper({
  minDate,
  children,
  ...props
}: Omit<React.ComponentProps<typeof QuickPicksSidebar>, 'maxDate'> & {
  minDate?: DateValue;
  children?: React.ReactNode;
}) {
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [rangeType, setRangeType] = useState<DatePickerRangeType>('custom');
  const today = dayjs();
  const maxDate = today.toDate();

  const handleChange = (range: DateRange, newRangeType: DatePickerRangeType) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setRangeType(newRangeType);
    props.onChange?.(range, newRangeType);
  };

  return (
    <Box p="xl" style={{ maxWidth: 600 }}>
      <Flex gap="md" align="flex-start">
        <QuickPicksSidebar minDate={minDate} maxDate={maxDate} onChange={handleChange} />
        <Stack gap="md" style={{ flex: 1 }}>
          {children}
          <Text size="sm" c="dimmed">
            Click on any quick pick option to see the selected date range update.
          </Text>
          <Paper p="md" withBorder>
            <Stack gap="xs">
              <Text size="sm" fw={600}>
                Selected Range:
              </Text>
              <Text size="sm" c="dimmed">
                Type: {rangeType}
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
                <>
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
                  <Text size="xs" c="dimmed">
                    Start:{' '}
                    {dayjs(
                      startDate instanceof Date ? startDate : new Date(startDate)
                    ).toISOString()}
                  </Text>
                  <Text size="xs" c="dimmed">
                    End:{' '}
                    {dayjs(endDate instanceof Date ? endDate : new Date(endDate)).toISOString()}
                  </Text>
                </>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Flex>
    </Box>
  );
}

export const Default: Story = {
  render: () => (
    <QuickPicksSidebarWrapper>
      <Text size="sm" c="dimmed" mb="md">
        Quick Picks sidebar with all available shortcuts. Click any option to instantly select that
        date range.
      </Text>
    </QuickPicksSidebarWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Default Quick Picks sidebar displaying all available shortcuts including This Month, Last Month, This Quarter, Last Quarter, Last Year, All Time, and recent quarters.',
      },
    },
  },
};

export const WithMinDate: Story = {
  render: () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return (
      <QuickPicksSidebarWrapper minDate={oneYearAgo}>
        <Text size="sm" c="dimmed" mb="md">
          Quick Picks sidebar with a minimum date constraint. The "All Time" option will use the
          minDate as the start date.
        </Text>
      </QuickPicksSidebarWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Quick Picks sidebar with a minimum date constraint. The "All Time" option respects the minDate.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<DateValue>(null);
    const [endDate, setEndDate] = useState<DateValue>(null);
    const [rangeType, setRangeType] = useState<DatePickerRangeType>('custom');
    const today = dayjs();
    const maxDate = today.toDate();

    return (
      <Box p="xl" style={{ maxWidth: 600 }}>
        <Flex gap="md" align="flex-start">
          <QuickPicksSidebar
            maxDate={maxDate}
            onChange={(range, newRangeType) => {
              setStartDate(range.startDate);
              setEndDate(range.endDate);
              setRangeType(newRangeType);
            }}
          />
          <Stack gap="md" style={{ flex: 1 }}>
            <Text size="sm" c="dimmed">
              Interactive example. Click on any quick pick option to see the date range update
              instantly.
            </Text>
            <Paper p="md" withBorder>
              <Stack gap="xs">
                <Text size="sm" fw={600}>
                  Selected Range:
                </Text>
                <Text size="sm" c="dimmed">
                  Type: {rangeType}
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
                  <>
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
                    <Text size="xs" c="dimmed">
                      Start:{' '}
                      {dayjs(
                        startDate instanceof Date ? startDate : new Date(startDate)
                      ).toISOString()}
                    </Text>
                    <Text size="xs" c="dimmed">
                      End:{' '}
                      {dayjs(endDate instanceof Date ? endDate : new Date(endDate)).toISOString()}
                    </Text>
                  </>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Flex>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example demonstrating all quick pick options and their effect on date range selection.',
      },
    },
  },
};

export const AllQuickPicks: Story = {
  render: () => (
    <Box p="xl" style={{ maxWidth: 600 }}>
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          All available quick pick options:
        </Text>
        <Paper p="md" withBorder>
          <Stack gap="xs">
            <Text size="sm" fw={600}>
              Standard Options:
            </Text>
            <Text size="xs" c="dimmed">
              • This Month - Current month's date range
            </Text>
            <Text size="xs" c="dimmed">
              • Last Month - Previous month's date range
            </Text>
            <Text size="xs" c="dimmed">
              • This Quarter - Current quarter's date range
            </Text>
            <Text size="xs" c="dimmed">
              • Last Quarter - Previous quarter's date range
            </Text>
            <Text size="xs" c="dimmed">
              • Last Year - Previous year's date range
            </Text>
            <Text size="xs" c="dimmed">
              • All Time - From minDate (or earliest) to today
            </Text>
            <Text size="sm" fw={600} mt="md">
              Recent Quarters:
            </Text>
            <Text size="xs" c="dimmed">
              • Displays the current quarter and the 2 previous quarters
            </Text>
            <Text size="xs" c="dimmed">
              • Format: &quot;Q[number] [year]&quot; (e.g., &quot;Q3 2024&quot;)
            </Text>
          </Stack>
        </Paper>
        <QuickPicksSidebarWrapper />
      </Stack>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Documentation of all available quick pick options and their functionality.',
      },
    },
  },
};
