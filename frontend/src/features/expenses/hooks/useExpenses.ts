import { useState, useEffect, useCallback } from 'react';
import { ExpenseRecord, CreateExpenseDTO } from '../types/expense.types';
import { expenseApi } from '../services/expenseApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

const MOCK_EXPENSES: ExpenseRecord[] = [
  {
    id: 'exp-1',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Electricity bill Mar 2025',
    category: 'ELECTRICITY',
    amount: 5200,
    date: '2025-04-01',
    paidTo: 'Electricity Board',
  },
  {
    id: 'exp-2',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Water bill',
    category: 'WATER',
    amount: 1800,
    date: '2025-04-02',
    paidTo: 'Water Board',
  },
  {
    id: 'exp-3',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Kitchen groceries',
    category: 'GROCERIES_FOOD',
    amount: 3500,
    date: '2025-04-03',
    paidTo: 'Supermarket',
  },
  {
    id: 'exp-4',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Fan repair (Room 202)',
    category: 'MAINTENANCE_REPAIRS',
    amount: 1200,
    date: '2025-04-05',
    paidTo: 'Electrician',
  },
  {
    id: 'exp-5',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Staff salary',
    category: 'SALARIES',
    amount: 15000,
    date: '2025-04-08',
    paidTo: 'PG Staff',
  },
  {
    id: 'exp-6',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'WiFi recharge',
    category: 'INTERNET_WIFI',
    amount: 1000,
    date: '2025-04-10',
    paidTo: 'Airtel Broadband',
  },
  {
    id: 'exp-7',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    title: 'Cleaning material',
    category: 'MISCELLANEOUS',
    amount: 800,
    date: '2025-04-12',
    paidTo: 'Cleaning Supply Co.',
  },
];

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(MOCK_EXPENSES);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await expenseApi.getAll({ propertyId: selectedProperty?.id });
      if (res.data && res.data.length > 0) setExpenses(res.data);
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const addExpense = async (data: CreateExpenseDTO) => {
    try {
      const res = await expenseApi.create(data);
      if (res.data) setExpenses((prev) => [res.data, ...prev]);
    } catch {
      const newExp: ExpenseRecord = {
        id: `exp-${Date.now()}`,
        ...data,
        propertyName: 'Sunrise PG',
      };
      setExpenses((prev) => [newExp, ...prev]);
    }
    addToast('success', 'Expense logged successfully!');
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return {
    expenses,
    loading,
    fetchExpenses,
    addExpense,
  };
};
