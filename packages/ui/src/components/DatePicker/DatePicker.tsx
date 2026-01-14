import { useCallback, useState } from 'react';

import dayjs from 'dayjs';

import { Button, Flex, Group, ScrollArea, SegmentedControl, Stack, Text } from '@mantine/core';
import { type DateValue } from '@mantine/dates';

import { CustomRangePicker } from './CustomRangePicker';
import { DateInput } from './DateInput';
import { MonthlyRangePicker } from './MonthlyRangePicker';
import { QuarterlyRangePicker } from './QuarterlyRangePicker';
import { QuickPicksSidebar } from './QuickPicksSidebar';
import type { DatePickerRangeType, DateRange } from './types';

export interface DatePickerProps {
  startDate: DateValue;
  endDate: DateValue;
  maxDataHistory?: DateValue;
  initialRangeType?: DatePickerRangeType;
  onChange?: (range: DateRange) => void;
  onApply?: (startDate: DateValue, endDate: DateValue) => void;
}

export function DatePicker({
  startDate,
  endDate,
  maxDataHistory,
  initialRangeType = 'quarterly',
  onChange,
  onApply,
}: DatePickerProps) {
  const [rangeType, setRangeType] = useState<DatePickerRangeType>(initialRangeType);

  const today = dayjs();

  // Convert DateValue to Date for Mantine components
  const minDate = maxDataHistory
    ? maxDataHistory instanceof Date
      ? maxDataHistory
      : maxDataHistory
        ? new Date(maxDataHistory)
        : undefined
    : undefined;
  const maxDate = today.toDate();

  const handleChange = useCallback(
    (range: DateRange) => {
      onChange?.(range);
    },
    [onChange]
  );

  const handleApply = useCallback(() => {
    onApply?.(startDate, endDate);
  }, [startDate, endDate, onApply]);

  return (
    <Flex gap="md" align="flex-start">
      {/* Quick Picks Sidebar */}
      <QuickPicksSidebar minDate={minDate} maxDate={maxDate} onChange={handleChange} />

      {/* Main Content */}
      <Stack gap="md" style={{ flex: 1 }}>
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
        </ScrollArea>

        {/* Date Range Inputs and Apply Button */}
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <DateInput
              date={startDate}
              onChange={(date) => {
                handleChange({ startDate: date, endDate });
                setRangeType('custom');
              }}
            />
            <Text size="sm">to</Text>
            <DateInput
              date={endDate}
              onChange={(date) => {
                handleChange({ startDate, endDate: date });
                setRangeType('custom');
              }}
            />
          </Group>
          <Button onClick={handleApply}>Apply</Button>
        </Group>
      </Stack>
    </Flex>
  );
}
