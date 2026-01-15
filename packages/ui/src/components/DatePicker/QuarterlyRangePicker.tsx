import { useMemo } from 'react';

import { Box, Card, Group, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import {
  getCurrentDate,
  getQuarter,
  getQuarterEnd,
  getQuarterStart,
  getYear,
  isAfter,
  isBefore,
  isSameDay,
} from '@acme/utils/date';

import type { DateRange } from './types';

interface QuarterlyRangePickerProps {
  startDate: DateValue;
  endDate: DateValue;
  minDate?: DateValue;
  maxDate: DateValue;
  onChange?: (range: DateRange) => void;
}

export function QuarterlyRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
}: QuarterlyRangePickerProps) {
  const today = getCurrentDate();
  const currentYear = getYear(today);
  const currentQuarter = getQuarter(today);

  // Generate quarters for display
  const quartersByYear = useMemo(() => {
    const quarters: Array<{ year: number; quarter: number; label: string }> = [];
    const startYear = minDate ? getYear(minDate) : currentYear - 2;
    const endYear = currentYear;

    for (let year = endYear; year >= startYear; year--) {
      // For current year, show all quarters (they'll be disabled if in the future)
      // For past years, only show quarters that have ended
      for (let q = 3; q >= 0; q--) {
        const quarterEnd = getQuarterEnd(year, q);

        // Skip if before minDate
        if (minDate && isBefore(quarterEnd, minDate)) {
          continue;
        }
        // Skip if after today (only for past years - current year shows all quarters)
        if (year !== currentYear && isAfter(quarterEnd, today)) {
          continue;
        }

        quarters.push({
          year,
          quarter: q,
          label: `Q${q + 1}`,
        });
      }
    }

    // Group quarters by year
    const grouped: Record<number, Array<{ year: number; quarter: number; label: string }>> = {};
    quarters.forEach((q) => {
      if (!grouped[q.year]) {
        grouped[q.year] = [];
      }
      grouped[q.year].push(q);
    });

    // Reverse the order of quarters within each year (Q1, Q2, Q3, Q4 instead of Q4, Q3, Q2, Q1)
    Object.keys(grouped).forEach((year) => {
      grouped[parseInt(year, 10)].reverse();
    });

    return grouped;
  }, [minDate, currentYear, today]);

  // Check if a quarter is the current quarter
  const isCurrentQuarter = (year: number, quarter: number) => {
    return year === currentYear && quarter === currentQuarter;
  };

  // Handle quarter selection
  const handleQuarterSelect = (year: number, quarter: number) => {
    const quarterStart = getQuarterStart(year, quarter);
    const quarterEnd = getQuarterEnd(year, quarter);

    let newStartDate = quarterStart;
    let newEndDate = quarterEnd;

    // Ensure dates are within bounds
    if (minDate) {
      const minDateObj = minDate instanceof Date ? minDate : minDate ? new Date(minDate) : null;
      if (minDateObj && isBefore(newStartDate, minDateObj)) {
        newStartDate = minDateObj;
      }
    }
    const maxDateObj = maxDate instanceof Date ? maxDate : maxDate ? new Date(maxDate) : null;
    if (maxDateObj && isAfter(newEndDate, maxDateObj)) {
      newEndDate = maxDateObj;
    }

    onChange?.({
      startDate: newStartDate,
      endDate: newEndDate,
    });
  };

  // Check if quarter is selected
  const isQuarterSelected = (year: number, quarter: number) => {
    if (!startDate || !endDate) {
      return false;
    }
    const quarterStart = getQuarterStart(year, quarter);
    const quarterEnd = getQuarterEnd(year, quarter);
    // Check if the selected range matches this quarter
    // Start date should be at or before quarter start, end date should be within or at quarter end
    return (
      (isBefore(startDate, quarterStart) || isSameDay(startDate, quarterStart)) &&
      (isAfter(endDate, quarterEnd) ||
        isSameDay(endDate, quarterEnd) ||
        (isAfter(endDate, quarterStart) && isBefore(endDate, quarterEnd)))
    );
  };

  return (
    <Stack gap="xs">
      {Object.entries(quartersByYear)
        .sort(([a], [b]) => parseInt(b, 10) - parseInt(a, 10))
        .map(([year, quarters]) => (
          <Stack key={year} gap="xs">
            <Text size="sm" fw={600}>
              {year}
            </Text>
            <Group gap="md">
              {quarters.map((q) => {
                const yearNum = parseInt(year, 10);
                const isCurrent = isCurrentQuarter(yearNum, q.quarter);
                const isSelected = isQuarterSelected(yearNum, q.quarter);
                const quarterStart = getQuarterStart(yearNum, q.quarter);
                const quarterEnd = getQuarterEnd(yearNum, q.quarter);
                const minDateObj = minDate
                  ? minDate instanceof Date
                    ? minDate
                    : new Date(minDate)
                  : null;
                // Disable if before minDate or if the quarter hasn't started yet (completely in the future)
                // Allow current quarter to be selected even if incomplete
                const isDisabled =
                  (minDateObj && isBefore(quarterEnd, minDateObj)) || isAfter(quarterStart, today);

                return (
                  <Card
                    key={`${year}-Q${q.quarter + 1}`}
                    p="xs"
                    withBorder
                    shadow="none"
                    style={{
                      flex: 1,
                      minHeight: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      opacity: isDisabled ? 0.5 : 1,
                      borderColor: isSelected ? 'var(--mantine-color-blue-6)' : undefined,
                      position: 'relative',
                    }}
                    onClick={() => !isDisabled && handleQuarterSelect(yearNum, q.quarter)}
                  >
                    <Text
                      size="sm"
                      fw={600}
                      c={isSelected ? 'blue' : isDisabled ? 'dimmed' : undefined}
                    >
                      {q.label}
                    </Text>
                    {isCurrent && (
                      <Box
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: 'var(--mantine-color-blue-6)',
                        }}
                      />
                    )}
                  </Card>
                );
              })}
            </Group>
          </Stack>
        ))}
    </Stack>
  );
}
