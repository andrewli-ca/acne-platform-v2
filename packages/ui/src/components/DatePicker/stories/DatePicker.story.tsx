import { useState, type ReactNode } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';

import { Box, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { DatePicker, type DatePickerProps } from '../DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A date range picker component with three selection modes: quarterly, monthly, and custom date ranges. Includes quick pick shortcuts and respects date boundaries based on maxDataHistory.',
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
    maxDataHistory: {
      control: 'date',
      description: 'Limits how far in the past dates can be selected',
    },
    initialRangeType: {
      control: 'select',
      options: ['quarterly', 'monthly', 'custom'],
      description: 'Initial range type selection mode',
    },
    onChange: {
      action: 'rangeChanged',
      description: 'Callback when date range changes',
    },
    onApply: {
      action: 'applied',
      description: 'Callback when Apply button is clicked',
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Helper component to manage date picker state
function DatePickerWrapper({
  defaultStartDate,
  defaultEndDate,
  maxDataHistory,
  children,
  ...props
}: Omit<DatePickerProps, 'startDate' | 'endDate' | 'onChange'> & {
  defaultStartDate?: DateValue;
  defaultEndDate?: DateValue;
  children?: ReactNode;
}) {
  const [startDate, setStartDate] = useState<DateValue>(defaultStartDate || null);
  const [endDate, setEndDate] = useState<DateValue>(defaultEndDate || null);

  return (
    <Box p="xl" style={{ maxWidth: 1000 }}>
      <Stack gap="md">
        {children}
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          maxDataHistory={maxDataHistory}
          onChange={(range) => {
            setStartDate(range.startDate);
            setEndDate(range.endDate);
          }}
          {...props}
        />
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

export const Quarterly: Story = {
  render: () => (
    <DatePickerWrapper
      defaultStartDate={new Date(2024, 0, 1)}
      defaultEndDate={new Date(2024, 2, 31)}
      initialRangeType="quarterly"
    >
      <Text size="sm" c="dimmed" mb="md">
        Quarterly mode allows you to select date ranges by quarter. Click on any quarter card to
        select that quarter's date range.
      </Text>
    </DatePickerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Quarterly selection mode displays quarters grouped by year. Click on any quarter to select that quarter's date range. The current quarter is indicated with a blue dot.",
      },
    },
  },
};

export const Monthly: Story = {
  render: () => (
    <DatePickerWrapper
      defaultStartDate={new Date(2024, 0, 1)}
      defaultEndDate={new Date(2024, 0, 31)}
      initialRangeType="monthly"
    >
      <Text size="sm" c="dimmed" mb="md">
        Monthly mode allows you to select date ranges by month. Click on any month card to select
        that month's date range.
      </Text>
    </DatePickerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Monthly selection mode displays months grouped by year. Click on any month to select that month's date range. The current month is indicated with a blue dot.",
      },
    },
  },
};

export const Custom: Story = {
  render: () => (
    <DatePickerWrapper
      defaultStartDate={new Date(2024, 0, 15)}
      defaultEndDate={new Date(2024, 1, 20)}
      initialRangeType="custom"
    >
      <Text size="sm" c="dimmed" mb="md">
        Custom mode provides two side-by-side calendars for precise date range selection. Click on
        dates in the calendars or use the date inputs at the bottom.
      </Text>
    </DatePickerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Custom selection mode displays two full month calendars side by side. Select individual dates to create a custom date range. Dates can also be entered using the date inputs at the bottom.',
      },
    },
  },
};

export const WithMaxDataHistory: Story = {
  render: () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return (
      <DatePickerWrapper maxDataHistory={oneYearAgo}>
        <Text size="sm" c="dimmed" mb="md">
          This example limits date selection to the past year. Dates before one year ago are
          disabled.
        </Text>
      </DatePickerWrapper>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The maxDataHistory prop limits how far in the past dates can be selected. Dates before this limit are disabled.',
      },
    },
  },
};

export const WithQuickPicks: Story = {
  render: () => (
    <DatePickerWrapper>
      <Text size="sm" c="dimmed" mb="md">
        Use the Quick Picks sidebar to quickly select common date ranges like "This Month", "Last
        Quarter", or "All Time".
      </Text>
    </DatePickerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The Quick Picks sidebar provides shortcuts to common date ranges. Click any option to instantly select that range.',
      },
    },
  },
};

export const Empty: Story = {
  render: () => (
    <DatePickerWrapper>
      <Text size="sm" c="dimmed" mb="md">
        DatePicker with no initial selection. Select dates using any of the three modes.
      </Text>
    </DatePickerWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DatePicker with no initial date selection.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<DateValue>(null);
    const [endDate, setEndDate] = useState<DateValue>(null);

    return (
      <Box p="xl" style={{ maxWidth: 1000 }}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Interactive example showing all three selection modes. Try switching between Quarterly,
            Monthly, and Custom modes, and use the Quick Picks shortcuts.
          </Text>
          <DatePicker
            startDate={startDate}
            endDate={endDate}
            onChange={(range) => {
              setStartDate(range.startDate);
              setEndDate(range.endDate);
            }}
            onApply={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
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
          'Interactive example demonstrating all features of the DatePicker component including mode switching and date selection.',
      },
    },
  },
};
