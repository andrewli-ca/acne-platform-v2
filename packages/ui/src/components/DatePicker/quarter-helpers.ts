import dayjs, { type Dayjs } from 'dayjs';

/**
 * Get the quarter number (0-3) for a given date
 * Q1 = 0 (Jan-Mar), Q2 = 1 (Apr-Jun), Q3 = 2 (Jul-Sep), Q4 = 3 (Oct-Dec)
 */
export function getQuarter(date: Dayjs): number {
  return Math.floor(date.month() / 3);
}

/**
 * Get the start date of a quarter for a given year and quarter number (0-3)
 */
export function getQuarterStart(year: number, quarter: number): Dayjs {
  // Quarter 0: January (month 0)
  // Quarter 1: April (month 3)
  // Quarter 2: July (month 6)
  // Quarter 3: October (month 9)
  const month = quarter * 3;
  return dayjs().year(year).month(month).startOf('month');
}

/**
 * Get the end date of a quarter for a given year and quarter number (0-3)
 */
export function getQuarterEnd(year: number, quarter: number): Dayjs {
  // Quarter 0: March (month 2)
  // Quarter 1: June (month 5)
  // Quarter 2: September (month 8)
  // Quarter 3: December (month 11)
  const month = quarter * 3 + 2;
  return dayjs().year(year).month(month).endOf('month');
}

/**
 * Get the start and end dates of a quarter for a given year and quarter number (0-3)
 */
export function getQuarterRange(year: number, quarter: number): { start: Dayjs; end: Dayjs } {
  return {
    start: getQuarterStart(year, quarter),
    end: getQuarterEnd(year, quarter),
  };
}

/**
 * Get the start and end dates of the previous quarter relative to a given date
 */
export function getPreviousQuarter(date: Dayjs): {
  start: Dayjs;
  end: Dayjs;
  year: number;
  quarter: number;
} {
  const currentQuarter = getQuarter(date);
  const currentYear = date.year();

  let prevQuarter: number;
  let prevYear: number;

  if (currentQuarter === 0) {
    // If current is Q1, previous is Q4 of previous year
    prevQuarter = 3;
    prevYear = currentYear - 1;
  } else {
    prevQuarter = currentQuarter - 1;
    prevYear = currentYear;
  }

  return {
    start: getQuarterStart(prevYear, prevQuarter),
    end: getQuarterEnd(prevYear, prevQuarter),
    year: prevYear,
    quarter: prevQuarter,
  };
}

/**
 * Get the start and end dates of the current quarter for a given date
 */
export function getCurrentQuarter(date: Dayjs): {
  start: Dayjs;
  end: Dayjs;
  year: number;
  quarter: number;
} {
  const quarter = getQuarter(date);
  const year = date.year();

  return {
    start: getQuarterStart(year, quarter),
    end: getQuarterEnd(year, quarter),
    year,
    quarter,
  };
}
