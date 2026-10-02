import { api } from '@/services/api';
import { ExpenseRecord, CreateExpenseDTO } from '../types/expense.types';

export const expenseApi = {
  getAll: (params?: { propertyId?: string }) => api.get<ExpenseRecord[]>('/expenses', params),
  getById: (id: string) => api.get<ExpenseRecord>(`/expenses/${id}`),
  create: (data: CreateExpenseDTO) => api.post<ExpenseRecord>('/expenses', data),
  delete: (id: string) => api.delete<void>(`/expenses/${id}`),
};
