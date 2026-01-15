import { useState } from 'react';

import { Button, Popover } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import {
  DateFormat,
  endOfMonth,
  endOfYear,
  formatDate,
  getCurrentDate,
  getCurrentQuarter,
  getQuarterRange,
  getYear,
  isSameDay,
  isSameMonth,
  isSameYear,
  startOfMonth,
  startOfYear,
} from '@acme/utils/date';

import { DatePicker } from './DatePicker';
import type { DatePickerRangeType, DateRange } from './types';

function getQuarterLabel(year: number, quarter0: number) {
  return `Q${quarter0 + 1} ${year}`;
}

function formatCustomRange(start: Date, end: Date) {
  const currentYear = getYear(getCurrentDate());
  const includeYear = start.getFullYear() !== currentYear || end.getFullYear() !== currentYear;

  if (includeYear) {
    return `${formatDate(start, DateFormat.SHORT_NO_COMMA)} - ${formatDate(end, DateFormat.SHORT_NO_COMMA)}`;
  }

  return `${formatDate(start, DateFormat.SHORT_NO_YEAR)} - ${formatDate(end, DateFormat.SHORT_NO_YEAR)}`;
}

function getButtonLabel(startDate: DateValue, endDate: DateValue, rangeType: DatePickerRangeType) {
  if (!startDate || !endDate) {
    return 'Quick Date Switcher';
  }

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);

  if (rangeType === 'custom') {
    return formatCustomRange(start, end);
  }

  if (rangeType === 'monthly') {
    const monthStart = startOfMonth(start);
    const monthEnd = endOfMonth(start);
    const isSingleMonth =
      isSameMonth(start, end) && isSameDay(start, monthStart) && isSameDay(end, monthEnd);

    if (isSingleMonth) {
      return formatDate(start, DateFormat.MONTH_YEAR);
    }

    return `${formatDate(start, DateFormat.MONTH_YEAR)} - ${formatDate(end, DateFormat.MONTH_YEAR)}`;
  }

  // rangeType === 'quarterly'
  const startQ = getCurrentQuarter(start);
  const endQ = getCurrentQuarter(end);
  const isSameQuarter = startQ.year === endQ.year && startQ.quarter === endQ.quarter;
  const expectedQuarterRange = getQuarterRange(startQ.year, startQ.quarter);
  const isSingleQuarter =
    isSameQuarter &&
    isSameDay(start, expectedQuarterRange.start) &&
    isSameDay(end, expectedQuarterRange.end);

  if (isSingleQuarter) {
    return getQuarterLabel(startQ.year, startQ.quarter);
  }

  const yearStart = startOfYear(start);
  const yearEnd = endOfYear(start);
  const isFullYear =
    isSameYear(start, end) && isSameDay(start, yearStart) && isSameDay(end, yearEnd);

  if (isFullYear) {
    return `${start.getFullYear()}`;
  }

  return `${getQuarterLabel(startQ.year, startQ.quarter)} - ${getQuarterLabel(endQ.year, endQ.quarter)}`;
}

export function QuickDateSwitcherDropdown() {
  const [startDate, setStartDate] = useState<DateValue>(null);
  const [endDate, setEndDate] = useState<DateValue>(null);
  const [rangeType, setRangeType] = useState<DatePickerRangeType>('quarterly');

  const [opened, setOpened] = useState(false);

  const handleApply = (range: DateRange, nextRangeType: DatePickerRangeType) => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setRangeType(nextRangeType);
    setOpened(false);
  };

  return (
    <Popover trapFocus opened={opened} onDismiss={() => setOpened(false)}>
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          {getButtonLabel(startDate, endDate, rangeType)}
        </Button>
      </Popover.Target>
      <Popover.Dropdown w="860px" bdrs="md">
        <DatePicker
          initialStartDate={startDate}
          initialEndDate={endDate}
          initialRangeType={rangeType}
          onApply={handleApply}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
