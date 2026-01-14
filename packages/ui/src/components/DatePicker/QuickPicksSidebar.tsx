import { useCallback, useMemo } from 'react';

import dayjs from 'dayjs';

import { Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import type { DateRange } from './CustomRangePicker';
import { getCurrentQuarter, getPreviousQuarter, getQuarterRange } from './quarter-helpers';

interface QuickPicksSidebarProps {
  minDate?: DateValue;
  maxDate: DateValue;
  onChange?: (range: DateRange) => void;
}

export function QuickPicksSidebar({ minDate, maxDate, onChange }: QuickPicksSidebarProps) {
  const today = dayjs();

  // Quick pick handlers
  const handleQuickPick = useCallback(
    (type: string) => {
      let newStartDate: Date | null = null;
      let newEndDate: Date | null = null;

      switch (type) {
        case 'thisMonth':
          newStartDate = today.startOf('month').toDate();
          newEndDate = today.endOf('month').toDate();
          break;
        case 'lastMonth':
          newStartDate = today.subtract(1, 'month').startOf('month').toDate();
          newEndDate = today.subtract(1, 'month').endOf('month').toDate();
          break;
        case 'thisQuarter': {
          const currentQ = getCurrentQuarter(today);
          newStartDate = currentQ.start.toDate();
          newEndDate = currentQ.end.toDate();
          break;
        }
        case 'lastQuarter': {
          const prevQ = getPreviousQuarter(today);
          newStartDate = prevQ.start.toDate();
          newEndDate = prevQ.end.toDate();
          break;
        }
        case 'lastYear':
          newStartDate = today.subtract(1, 'year').startOf('year').toDate();
          newEndDate = today.subtract(1, 'year').endOf('year').toDate();
          break;
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
          break;
        }
        default: {
          // Handle quarter format like "Q3 2025"
          const quarterMatch = type.match(/Q(\d)\s(\d{4})/);
          if (quarterMatch) {
            const quarter = parseInt(quarterMatch[1], 10) - 1;
            const year = parseInt(quarterMatch[2], 10);
            const quarterRange = getQuarterRange(year, quarter);
            newStartDate = quarterRange.start.toDate();
            newEndDate = quarterRange.end.toDate();
          }
          break;
        }
      }

      if (newStartDate && newEndDate) {
        // Ensure dates are within bounds
        if (minDate) {
          const minDateObj = minDate instanceof Date ? minDate : minDate ? new Date(minDate) : null;
          if (minDateObj && dayjs(newStartDate).isBefore(minDateObj)) {
            newStartDate = minDateObj;
          }
        }
        const maxDateObj = maxDate instanceof Date ? maxDate : maxDate ? new Date(maxDate) : null;
        if (maxDateObj && dayjs(newEndDate).isAfter(maxDateObj)) {
          newEndDate = maxDateObj;
        }

        onChange?.({
          startDate: newStartDate,
          endDate: newEndDate,
        });
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
