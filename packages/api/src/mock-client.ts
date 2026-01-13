import type { DashboardStat, Transaction, User } from './types';

// Simulated auth state
let isAuthenticatedState = false;
let currentUser: User | null = null;

// Mock data
const MOCK_DASHBOARD_STATS: DashboardStat[] = [
  {
    label: 'Total Revenue',
    value: '$45,231',
    trend: '+12.5%',
    trendDirection: 'up',
  },
  {
    label: 'Active Users',
    value: '2,345',
    trend: '+8.2%',
    trendDirection: 'up',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    trend: '-2.1%',
    trendDirection: 'down',
  },
];

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2026-01-09',
    recipient: 'Acme Corp',
    amount: 1250.0,
    status: 'completed',
    category: 'Payment',
    memo: 'Invoice #1234',
  },
  {
    id: '2',
    date: '2026-01-08',
    recipient: 'Tech Solutions Inc',
    amount: 3500.0,
    status: 'completed',
    category: 'Service',
    memo: 'Monthly consulting fee',
  },
  {
    id: '3',
    date: '2026-01-07',
    recipient: 'Digital Marketing Co',
    amount: 875.5,
    status: 'pending',
    category: 'Marketing',
    memo: 'Campaign costs',
  },
  {
    id: '4',
    date: '2026-01-06',
    recipient: 'Cloud Services LLC',
    amount: 2200.0,
    status: 'completed',
    category: 'Infrastructure',
    memo: 'Q1 hosting fees',
  },
  {
    id: '5',
    date: '2026-01-05',
    recipient: 'Startup Ventures',
    amount: 450.0,
    status: 'failed',
    category: 'Payment',
    memo: 'Refund processed',
  },
];

// Utility to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock API client for simulating backend calls
 */
export const mockClient = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return isAuthenticatedState;
  },

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return currentUser;
  },

  /**
   * Simulate login
   */
  async login(email: string, password: string): Promise<User> {
    await delay(500);

    // Simple mock authentication (accept any non-empty credentials)
    if (email && password) {
      isAuthenticatedState = true;
      currentUser = {
        id: '1',
        email,
        name: email.split('@')[0],
        isAuthenticated: true,
      };
      return currentUser;
    }

    throw new Error('Invalid credentials');
  },

  /**
   * Simulate logout
   */
  async logout(): Promise<void> {
    await delay(200);
    isAuthenticatedState = false;
    currentUser = null;
  },

  /**
   * Fetch dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStat[]> {
    await delay(300);
    return MOCK_DASHBOARD_STATS;
  },

  /**
   * Fetch all transactions
   */
  async getTransactions(): Promise<Transaction[]> {
    await delay(4000);
    return MOCK_TRANSACTIONS;
  },

  /**
   * Fetch a single transaction by ID
   */
  async getTransactionById(id: string): Promise<Transaction | null> {
    await delay(200);
    return MOCK_TRANSACTIONS.find((t) => t.id === id) || null;
  },
};
