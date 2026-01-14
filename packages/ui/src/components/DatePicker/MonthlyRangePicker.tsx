import { useMemo } from 'react';

import dayjs from 'dayjs';

import { Box, Card, Group, Stack, Text } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

import type { DateRange } from './CustomRangePicker';

interface MonthlyRangePickerProps {
  startDate: DateValue;
  endDate: DateValue;
  minDate?: DateValue;
  maxDate: DateValue;
  onChange?: (range: DateRange) => void;
}

export function MonthlyRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
}: MonthlyRangePickerProps) {
  const today = dayjs();
  const currentYear = today.year();
  const currentMonth = today.month();

  // Generate months for display
  const monthsByYear = useMemo(() => {
    const months: Array<{ year: number; month: number; label: string }> = [];
    const startYear = minDate ? dayjs(minDate).year() : currentYear - 1;
    const endYear = currentYear;

    for (let year = endYear; year >= startYear; year--) {
      // For current year, show all months (they'll be disabled if in the future)
      // For past years, show all 12 months (they've all ended)
      const endMonth = 11; // Always show all 12 months
      for (let m = endMonth; m >= 0; m--) {
        const monthEnd = dayjs().year(year).month(m).endOf('month');

        // Skip if before minDate
        if (minDate && monthEnd.isBefore(minDate)) {
          continue;
        }
        // Skip if after today (only for past years - current year shows all months)
        if (year !== currentYear && monthEnd.isAfter(today)) {
          continue;
        }

        months.push({
          year,
          month: m,
          label: dayjs().month(m).format('MMM'),
        });
      }
    }

    // Group months by year
    const grouped: Record<number, Array<{ year: number; month: number; label: string }>> = {};
    months.forEach((m) => {
      if (!grouped[m.year]) {
        grouped[m.year] = [];
      }
      grouped[m.year].push(m);
    });

    // Reverse the order of months within each year (Jan, Feb, ..., Dec instead of Dec, ..., Feb, Jan)
    Object.keys(grouped).forEach((year) => {
      grouped[parseInt(year, 10)].reverse();
    });

    return grouped;
  }, [minDate, currentYear, currentMonth, today]);

  // Check if a month is the current month
  const isCurrentMonth = (year: number, month: number) => {
    return year === currentYear && month === currentMonth;
  };

  // Handle month selection
  const handleMonthSelect = (year: number, month: number) => {
    const monthStart = dayjs().year(year).month(month).startOf('month');
    const monthEnd = dayjs().year(year).month(month).endOf('month');

    let newStartDate = monthStart.toDate();
    let newEndDate = monthEnd.toDate();

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
  };

  // Check if month is selected
  const isMonthSelected = (year: number, month: number) => {
    if (!startDate || !endDate) {
      return false;
    }
    const monthStart = dayjs().year(year).month(month).startOf('month');
    const monthEnd = dayjs().year(year).month(month).endOf('month');
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    // Check if the selected range matches this month
    // Start date should be at or before month start, end date should be within or at month end
    return (
      (start.isBefore(monthStart) || start.isSame(monthStart)) &&
      (end.isAfter(monthEnd) ||
        end.isSame(monthEnd) ||
        (end.isAfter(monthStart) && end.isBefore(monthEnd)))
    );
  };

  return (
    <Stack gap="xs">
      {Object.entries(monthsByYear)
        .sort(([a], [b]) => parseInt(b, 10) - parseInt(a, 10))
        .map(([year, months]) => {
          const yearNum = parseInt(year, 10);
          return (
            <Stack key={year} gap="xs">
              <Text size="sm" fw={600}>
                {year}
              </Text>
              <Group gap="md">
                {months.map((m) => {
                  const isCurrent = isCurrentMonth(yearNum, m.month);
                  const isSelected = isMonthSelected(yearNum, m.month);
                  const monthStart = dayjs().year(yearNum).month(m.month).startOf('month');
                  const monthEnd = dayjs().year(yearNum).month(m.month).endOf('month');
                  const minDateObj = minDate
                    ? minDate instanceof Date
                      ? minDate
                      : new Date(minDate)
                    : null;
                  // Disable if before minDate or if the month hasn't started yet (completely in the future)
                  // Allow current month to be selected even if incomplete
                  const isDisabled =
                    (minDateObj && monthEnd.isBefore(minDateObj)) || monthStart.isAfter(today);

                  return (
                    <Card
                      key={`${year}-${m.month}`}
                      p="xs"
                      withBorder
                      shadow="none"
                      style={{
                        width: 103,
                        minHeight: 60,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.5 : 1,
                        borderColor: isSelected ? 'var(--mantine-color-blue-6)' : undefined,
                        position: 'relative',
                      }}
                      onClick={() => !isDisabled && handleMonthSelect(yearNum, m.month)}
                    >
                      <Text
                        size="sm"
                        fw={600}
                        c={isSelected ? 'blue' : isDisabled ? 'dimmed' : undefined}
                      >
                        {m.label}
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
          );
        })}
    </Stack>
  );
}
