import { useState } from 'react';

import dayjs from 'dayjs';

import { Button, Popover } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import { DatePicker } from './DatePicker';
import { getCurrentQuarter, getQuarterRange } from './quarter-helpers';
import type { DatePickerRangeType, DateRange } from './types';

function getQuarterLabel(year: number, quarter0: number) {
  return `Q${quarter0 + 1} ${year}`;
}

function formatCustomRange(start: Date, end: Date) {
  const currentYear = dayjs().year();
  const includeYear = start.getFullYear() !== currentYear || end.getFullYear() !== currentYear;

  const startFmt = includeYear ? 'MMM D YYYY' : 'MMM D';
  const endFmt = includeYear ? 'MMM D YYYY' : 'MMM D';

  return `${dayjs(start).format(startFmt)} - ${dayjs(end).format(endFmt)}`;
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
    const isSingleMonth =
      dayjs(start).isSame(dayjs(end), 'month') &&
      dayjs(start).isSame(dayjs(start).startOf('month'), 'day') &&
      dayjs(end).isSame(dayjs(end).endOf('month'), 'day');

    if (isSingleMonth) {
      return dayjs(start).format('MMM YYYY');
    }

    return `${dayjs(start).format('MMM YYYY')} - ${dayjs(end).format('MMM YYYY')}`;
  }

  // rangeType === 'quarterly'
  const startQ = getCurrentQuarter(dayjs(start));
  const endQ = getCurrentQuarter(dayjs(end));
  const isSameQuarter = startQ.year === endQ.year && startQ.quarter === endQ.quarter;
  const expectedQuarterRange = getQuarterRange(startQ.year, startQ.quarter);
  const isSingleQuarter =
    isSameQuarter &&
    dayjs(start).isSame(expectedQuarterRange.start, 'day') &&
    dayjs(end).isSame(expectedQuarterRange.end, 'day');

  if (isSingleQuarter) {
    return getQuarterLabel(startQ.year, startQ.quarter);
  }

  const isFullYear =
    dayjs(start).isSame(dayjs(end), 'year') &&
    dayjs(start).isSame(dayjs(start).startOf('year'), 'day') &&
    dayjs(end).isSame(dayjs(end).endOf('year'), 'day');

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
