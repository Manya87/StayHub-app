export type ExpenseCategory =
  | 'ELECTRICITY'
  | 'WATER'
  | 'INTERNET_WIFI'
  | 'MAINTENANCE_REPAIRS'
  | 'CLEANING_HOUSEKEEPING'
  | 'GROCERIES_FOOD'
  | 'SALARIES'
  | 'TAXES_PERMITS'
  | 'MISCELLANEOUS';

export interface ExpenseRecord {
  id: string;
  propertyId: string;
  propertyName?: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidTo: string;
  receiptUrl?: string;
  notes?: string;
}

export interface CreateExpenseDTO {
  propertyId: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidTo: string;
  notes?: string;
}
