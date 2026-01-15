import { useCallback, useState } from 'react';

import { Box, Button, Flex, Group, ScrollArea, SegmentedControl, Stack, Text } from '@mantine/core';
import { type DateValue } from '@mantine/dates';

import { getCurrentDate } from '@acme/utils/date';

import { CustomRangePicker } from './CustomRangePicker';
import { DateInput } from './DateInput';
import { MonthlyRangePicker } from './MonthlyRangePicker';
import { QuarterlyRangePicker } from './QuarterlyRangePicker';
import { QuickPicksSidebar } from './QuickPicksSidebar';
import type { DatePickerRangeType, DateRange } from './types';

export interface DatePickerProps {
  initialStartDate: DateValue;
  initialEndDate: DateValue;
  initialRangeType?: DatePickerRangeType;
  maxDataHistory?: DateValue;
  onChange?: (range: DateRange, rangeType: DatePickerRangeType) => void;
  onApply?: (range: DateRange, rangeType: DatePickerRangeType) => void;
}

export function DatePicker({
  initialStartDate,
  initialEndDate,
  initialRangeType = 'quarterly',
  maxDataHistory,
  onChange,
  onApply,
}: DatePickerProps) {
  const [rangeType, setRangeType] = useState<DatePickerRangeType>(initialRangeType);
  const [startDate, setStartDate] = useState<DateValue>(initialStartDate);
  const [endDate, setEndDate] = useState<DateValue>(initialEndDate);

  const today = getCurrentDate();

  // Convert DateValue to Date for Mantine components
  const minDate = maxDataHistory
    ? maxDataHistory instanceof Date
      ? maxDataHistory
      : maxDataHistory
        ? new Date(maxDataHistory)
        : undefined
    : undefined;
  const maxDate = today;

  const handleChange = useCallback(
    (range: DateRange, nextRangeType: DatePickerRangeType = rangeType) => {
      setStartDate(range.startDate);
      setEndDate(range.endDate);
      setRangeType(nextRangeType);
      onChange?.(range, nextRangeType);
    },
    [onChange, rangeType]
  );

  const handleApply = useCallback(() => {
    onApply?.({ startDate, endDate }, rangeType);
  }, [startDate, endDate, onApply, rangeType]);

  return (
    <Flex gap="md" align="stretch">
      {/* Quick Picks Sidebar */}
      <Box style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }} pr="lg">
        <QuickPicksSidebar
          minDate={minDate}
          maxDate={maxDate}
          onChange={(range, rangeType) => {
            handleChange(range, rangeType);
          }}
        />
      </Box>

      {/* Main Content */}
      <Stack gap="0" style={{ flex: 1 }}>
        {/* Tabs */}
        <Group justify="center" align="center">
          <SegmentedControl
            value={rangeType}
            onChange={(value) => setRangeType(value as DatePickerRangeType)}
            data={[
              { label: 'Quarterly', value: 'quarterly' },
              { label: 'Monthly', value: 'monthly' },
              { label: 'Custom', value: 'custom' },
            ]}
          />
        </Group>

        {/* Content Area */}
        <ScrollArea h="333px">
          <Box py="md">
            {rangeType === 'quarterly' && (
              <QuarterlyRangePicker
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleChange}
              />
            )}

            {rangeType === 'monthly' && (
              <MonthlyRangePicker
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleChange}
              />
            )}

            {rangeType === 'custom' && (
              <CustomRangePicker
                startDate={startDate}
                endDate={endDate}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleChange}
              />
            )}
          </Box>
        </ScrollArea>

        {/* Date Range Inputs and Apply Button */}
        <Group
          justify="space-between"
          align="center"
          style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}
          pt="md"
        >
          <Group gap="xs">
            <DateInput
              date={startDate}
              onChange={(date) => {
                handleChange({ startDate: date, endDate }, 'custom');
              }}
            />
            <Text size="sm">to</Text>
            <DateInput
              date={endDate}
              onChange={(date) => {
                handleChange({ startDate, endDate: date }, 'custom');
              }}
            />
          </Group>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Stack>
    </Flex>
  );
}
