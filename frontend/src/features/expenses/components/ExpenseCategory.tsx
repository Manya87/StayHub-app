import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { ExpenseCategory } from '../types/expense.types';

export const ExpenseCategoryBadge: React.FC<{ category: ExpenseCategory }> = ({ category }) => {
  const getVariant = (c: ExpenseCategory) => {
    switch (c) {
      case 'ELECTRICITY':
      case 'WATER':
        return 'info';
      case 'GROCERIES_FOOD':
        return 'warning';
      case 'SALARIES':
        return 'indigo';
      case 'MAINTENANCE_REPAIRS':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  return (
    <Badge variant={getVariant(category)} size="sm">
      {category.replace('_', ' ')}
    </Badge>
  );
};
