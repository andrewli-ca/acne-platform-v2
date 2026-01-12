/**
 * Dashboard statistic card data
 */
export interface DashboardStat {
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

/**
 * Transaction status types
 */
export type TransactionStatus = 'completed' | 'pending' | 'failed';

/**
 * Transaction record
 */
export interface Transaction {
  id: string;
  date: string;
  recipient: string;
  amount: number;
  status: TransactionStatus;
  category: string;
  memo?: string;
}

/**
 * User data
 */
export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}
