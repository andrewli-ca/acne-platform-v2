import { useCallback, useMemo } from 'react';

import { Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import {
  addMonths,
  addYears,
  endOfMonth,
  endOfYear,
  getCurrentDate,
  getCurrentQuarter,
  getPreviousQuarter,
  getQuarterRange,
  isAfter,
  isBefore,
  startOfMonth,
  startOfYear,
} from '@acme/utils/date';

import type { DatePickerRangeType, DateRange } from './types';

interface QuickPicksSidebarProps {
  minDate?: DateValue;
  maxDate: DateValue;
  onChange?: (range: DateRange, rangeType: DatePickerRangeType) => void;
}

export function QuickPicksSidebar({ minDate, maxDate, onChange }: QuickPicksSidebarProps) {
  const today = getCurrentDate();

  // Quick pick handlers
  const handleQuickPick = useCallback(
    (type: string) => {
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;
      let newRangeType: DatePickerRangeType = 'custom';
      let isThisQuarter = false;

      switch (type) {
        case 'thisMonth':
          newStartDate = startOfMonth(today);
          newEndDate = endOfMonth(today);
          newRangeType = 'monthly';
          break;
        case 'lastMonth': {
          const lastMonth = addMonths(today, -1);
          newStartDate = startOfMonth(lastMonth);
          newEndDate = endOfMonth(lastMonth);
          newRangeType = 'monthly';
          break;
        }
        case 'thisQuarter': {
          const currentQ = getCurrentQuarter(today);
          newStartDate = currentQ.start;
          // Always use the full quarter end date, not clamped to today
          newEndDate = currentQ.end;
          newRangeType = 'quarterly';
          isThisQuarter = true;
          break;
        }
        case 'lastQuarter': {
          const prevQ = getPreviousQuarter(today);
          newStartDate = prevQ.start;
          newEndDate = prevQ.end;
          newRangeType = 'quarterly';
          break;
        }
        case 'lastYear': {
          const lastYear = addYears(today, -1);
          newStartDate = startOfYear(lastYear);
          newEndDate = endOfYear(lastYear);
          newRangeType = 'quarterly';
          break;
        }
        case 'allTime': {
          const minDateObj = minDate
            ? minDate instanceof Date
              ? minDate
              : minDate
                ? new Date(minDate)
                : null
            : null;
          const maxDateObj = maxDate instanceof Date ? maxDate : maxDate ? new Date(maxDate) : null;
          newStartDate = minDateObj;
          newEndDate = maxDateObj;
          newRangeType = 'quarterly';
          break;
        }
        default: {
          // Handle quarter format like "Q3 2025"
          const quarterMatch = type.match(/Q(\d)\s(\d{4})/);
          if (quarterMatch) {
            const quarter = parseInt(quarterMatch[1], 10) - 1;
            const year = parseInt(quarterMatch[2], 10);
            const quarterRange = getQuarterRange(year, quarter);
            newStartDate = quarterRange.start;
            newEndDate = quarterRange.end;
            newRangeType = 'quarterly';
          }
          break;
        }
      }

      if (newStartDate && newEndDate) {
        // Ensure dates are within bounds
        if (minDate) {
          const minDateObj = minDate instanceof Date ? minDate : minDate ? new Date(minDate) : null;
          if (minDateObj && isBefore(newStartDate, minDateObj)) {
            newStartDate = minDateObj;
          }
        }
        const maxDateObj = maxDate instanceof Date ? maxDate : maxDate ? new Date(maxDate) : null;
        // Don't clamp end date for "thisQuarter" - always use full quarter end date
        // For other cases, clamp if end date is after maxDate
        if (maxDateObj && isAfter(newEndDate, maxDateObj) && !isThisQuarter) {
          newEndDate = maxDateObj;
        }

        onChange?.(
          {
            startDate: newStartDate,
            endDate: newEndDate,
          },
          newRangeType
        );
      }
    },
    [today, minDate, maxDate, onChange]
  );

  // Generate recent quarters for quick picks
  const recentQuarters = useMemo(() => {
    const quarters: string[] = [];
    let currentDate = today;
    for (let i = 0; i < 3; i++) {
      const quarterInfo =
        i === 0 ? getCurrentQuarter(currentDate) : getPreviousQuarter(currentDate);
      quarters.push(`Q${quarterInfo.quarter + 1} ${quarterInfo.year}`);
      // Move to the previous quarter for next iteration
      currentDate = quarterInfo.start;
    }
    return quarters;
  }, [today]);

  return (
    <Stack gap="md">
      <Text size="xs" fw={600} c="dimmed">
        Quick Picks
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('thisMonth')}
      >
        This Month
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('lastMonth')}
      >
        Last Month
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('thisQuarter')}
      >
        This Quarter
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('lastQuarter')}
      >
        Last Quarter
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('lastYear')}
      >
        Last Year
      </Text>
      <Text
        size="sm"
        fw={500}
        style={{ cursor: 'pointer' }}
        onClick={() => handleQuickPick('allTime')}
      >
        All Time
      </Text>
      {recentQuarters.map((quarter) => (
        <Text
          key={quarter}
          size="sm"
          fw={500}
          style={{ cursor: 'pointer' }}
          onClick={() => handleQuickPick(quarter)}
        >
          {quarter}
        </Text>
      ))}
    </Stack>
  );
}
