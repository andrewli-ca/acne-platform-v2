import { useCallback, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

import { Box, Text, TextInput } from '@mantine/core';
import type { DateValue } from '@mantine/dates';

export interface DateInputProps {
  date: DateValue | null | undefined;
  onChange: (date: DateValue | null) => void;
}

export function DateInput({ date, onChange }: DateInputProps) {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [day, setDay] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');

  // Initialize from date prop
  useEffect(() => {
    if (date) {
      const d = dayjs(date);
      setDay(d.format('D'));
      setMonth(d.format('M'));
      setYear(d.format('YYYY'));
    } else {
      setDay('');
      setMonth('');
      setYear('');
    }
  }, [date]);

  const updateDate = useCallback(
    (newDay: string, newMonth: string, newYear: string) => {
      // If all fields are empty, return null
      if (!newDay && !newMonth && !newYear) {
        onChange(null);
        return;
      }

      // Only construct date if we have all three parts
      if (!newDay || !newMonth || !newYear) {
        return;
      }

      // Try to construct a valid date
      const dayNum = parseInt(newDay, 10);
      const monthNum = parseInt(newMonth, 10);
      const yearNum = parseInt(newYear, 10);

      // Validate ranges
      if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
        return;
      }
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return;
      }
      if (isNaN(yearNum) || yearNum < 1 || yearNum > 9999) {
        return;
      }

      // Use raw values without padding
      const constructedDate = dayjs(`${yearNum}-${monthNum}-${dayNum}`);

      // Check if date is valid
      if (constructedDate.isValid()) {
        onChange(constructedDate.toDate());
      }
    },
    [onChange]
  );

  // Get maximum days in a month for given month and year
  const getMaxDaysInMonth = useCallback((monthStr: string, yearStr: string): number => {
    if (!monthStr || !yearStr) {
      return 31; // Default to 31 if month/year not provided
    }

    const monthNum = parseInt(monthStr, 10);
    const yearNum = parseInt(yearStr, 10);

    if (isNaN(monthNum) || isNaN(yearNum) || monthNum < 1 || monthNum > 12) {
      return 31; // Default to 31 if invalid
    }

    // Use dayjs to get the actual days in the month (handles leap years)
    const date = dayjs(`${yearNum}-${monthNum}-1`);
    if (!date.isValid()) {
      return 31; // Default to 31 if invalid date
    }

    return date.daysInMonth();
  }, []);

  const handleDayChange = useCallback(
    (value: string) => {
      // Only filter non-digits, take input verbatim otherwise
      const digitsOnly = value.replace(/\D/g, '');

      // If empty, allow it
      if (!digitsOnly) {
        setDay('');
        updateDate('', month, year);
        return;
      }

      // Get max days for the current month/year
      const maxDays = getMaxDaysInMonth(month, year);

      // Parse the number and clamp between 1 and maxDays
      const dayNum = parseInt(digitsOnly, 10);
      let clampedDay: string;

      if (isNaN(dayNum)) {
        clampedDay = '';
      } else if (dayNum < 1) {
        clampedDay = '1';
      } else if (dayNum > maxDays) {
        clampedDay = maxDays.toString();
      } else {
        clampedDay = digitsOnly;
      }

      setDay(clampedDay);
      updateDate(clampedDay, month, year);
    },
    [month, year, updateDate, getMaxDaysInMonth]
  );

  const handleMonthChange = useCallback(
    (value: string) => {
      // Only filter non-digits, take input verbatim otherwise
      const digitsOnly = value.replace(/\D/g, '');

      // If empty, allow it
      if (!digitsOnly) {
        setMonth('');
        updateDate(day, '', year);
        return;
      }

      // Parse the number and clamp between 1 and 12
      const monthNum = parseInt(digitsOnly, 10);
      let clampedMonth: string;

      if (isNaN(monthNum)) {
        clampedMonth = '';
      } else if (monthNum < 1) {
        clampedMonth = '1';
      } else if (monthNum > 12) {
        clampedMonth = '12';
      } else {
        clampedMonth = digitsOnly;
      }

      setMonth(clampedMonth);

      // Re-validate day if it exceeds max days in new month
      if (day && year) {
        const maxDays = getMaxDaysInMonth(clampedMonth, year);
        const dayNum = parseInt(day, 10);
        if (!isNaN(dayNum) && dayNum > maxDays) {
          const adjustedDay = maxDays.toString();
          setDay(adjustedDay);
          updateDate(adjustedDay, clampedMonth, year);
        } else {
          updateDate(day, clampedMonth, year);
        }
      } else {
        updateDate(day, clampedMonth, year);
      }
    },
    [day, year, updateDate, getMaxDaysInMonth]
  );

  const handleYearChange = useCallback(
    (value: string) => {
      // Only filter non-digits, take input verbatim otherwise
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 4 digits
      const limited = digitsOnly.slice(0, 4);
      setYear(limited);

      // Only validate and update date when year is complete (4 digits)
      // This allows users to type partial years without manipulation
      if (limited.length === 4) {
        // Re-validate day if it exceeds max days in month for new year (handles leap years)
        if (day && month) {
          const maxDays = getMaxDaysInMonth(month, limited);
          const dayNum = parseInt(day, 10);
          if (!isNaN(dayNum) && dayNum > maxDays) {
            const adjustedDay = maxDays.toString();
            setDay(adjustedDay);
            updateDate(adjustedDay, month, limited);
          } else {
            updateDate(day, month, limited);
          }
        } else {
          updateDate(day, month, limited);
        }
      }
      // If year is incomplete, don't call updateDate - just store the raw input
    },
    [day, month, updateDate, getMaxDaysInMonth]
  );

  const handleDayFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const handleMonthFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  const handleYearFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  }, []);

  return (
    <Box
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: '1px solid var(--mantine-color-default-border)',
        borderRadius: 'var(--mantine-radius-sm)',
        gap: 0,
      }}
    >
      <TextInput
        ref={dayRef}
        value={day}
        onChange={(e) => handleDayChange(e.target.value)}
        onFocus={handleDayFocus}
        placeholder="DD"
        style={{
          width: 36,
          border: 'none',
          paddingLeft: 0,
          paddingRight: 0,
        }}
        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            padding: '0px',
            textAlign: 'center',
          },
        }}
        size="sm"
        variant="unstyled"
      />
      <Text size="sm" c="dimmed">
        /
      </Text>
      <TextInput
        ref={monthRef}
        value={month}
        onChange={(e) => handleMonthChange(e.target.value)}
        onFocus={handleMonthFocus}
        placeholder="MM"
        style={{
          width: 28,
          border: 'none',
          paddingLeft: 0,
          paddingRight: 0,
        }}
        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            padding: '0px',
            textAlign: 'center',
          },
        }}
        size="sm"
        variant="unstyled"
      />
      <Text size="sm" c="dimmed">
        /
      </Text>
      <TextInput
        ref={yearRef}
        value={year}
        onChange={(e) => handleYearChange(e.target.value)}
        onFocus={handleYearFocus}
        placeholder="YYYY"
        style={{
          width: 64,
          border: 'none',
          paddingLeft: 0,
          paddingRight: 0,
        }}
        styles={{
          input: {
            border: 'none',
            boxShadow: 'none',
            padding: '0px',
            textAlign: 'center',
          },
        }}
        size="sm"
        variant="unstyled"
      />
    </Box>
  );
}
