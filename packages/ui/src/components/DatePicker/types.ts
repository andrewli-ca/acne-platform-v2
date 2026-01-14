import type { DateValue } from '@mantine/dates';

export interface DateRange {
  startDate: DateValue;
  endDate: DateValue;
}

export type DatePickerRangeType = 'quarterly' | 'monthly' | 'custom';
