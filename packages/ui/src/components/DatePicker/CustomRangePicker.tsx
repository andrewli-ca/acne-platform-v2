import { Flex } from '@mantine/core';
import { DatePicker, type DatesRangeValue, type DateValue } from '@mantine/dates';

import type { DateRange } from './types';

interface CustomRangePickerProps {
  startDate: DateValue;
  endDate: DateValue;
  minDate?: DateValue;
  maxDate: DateValue;
  onChange?: (range: DateRange) => void;
}

export function CustomRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
}: CustomRangePickerProps) {
  const value: DatesRangeValue | undefined =
    startDate && endDate ? [startDate, endDate] : undefined;

  const handleDateChange = (dates: DatesRangeValue) => {
    if (dates) {
      const [start, end] = dates;
      onChange?.({
        startDate: start ?? null,
        endDate: end ?? null,
      });
    } else {
      onChange?.({
        startDate: null,
        endDate: null,
      });
    }
  };

  // Convert DateValue to Date | string | undefined for Mantine DatePicker
  const minDateValue = minDate === null ? undefined : minDate;
  const maxDateValue = maxDate === null ? undefined : maxDate;

  return (
    <Flex gap="md" align="flex-start" justify="center">
      <DatePicker
        type="range"
        value={value}
        onChange={handleDateChange}
        minDate={minDateValue}
        maxDate={maxDateValue}
        numberOfColumns={2}
      />
    </Flex>
  );
}
