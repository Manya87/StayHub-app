import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreateExpenseDTO, ExpenseCategory } from '../types/expense.types';
import { useProperties } from '@/features/properties/hooks/useProperties';

interface ExpenseFormProps {
  onSubmit: (data: CreateExpenseDTO) => void;
  onCancel: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onCancel }) => {
  const { properties } = useProperties();
  const [formData, setFormData] = useState<CreateExpenseDTO>({
    propertyId: properties[0]?.id || '',
    title: '',
    category: 'MAINTENANCE_REPAIRS',
    amount: 1500,
    date: new Date().toISOString().split('T')[0],
    paidTo: '',
    notes: '',
  });

  const propertyOptions = properties.map((p) => ({ label: p.name, value: p.id }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Property"
        value={formData.propertyId}
        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
        options={propertyOptions}
        required
      />

      <Input
        label="Expense Title / Purpose"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g. Plumbing repairs in 2nd floor bathroom"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
          options={[
            { label: 'Electricity Bill', value: 'ELECTRICITY' },
            { label: 'Water Supply', value: 'WATER' },
            { label: 'Internet / WiFi', value: 'INTERNET_WIFI' },
            { label: 'Maintenance & Repairs', value: 'MAINTENANCE_REPAIRS' },
            { label: 'Cleaning & Housekeeping', value: 'CLEANING_HOUSEKEEPING' },
            { label: 'Groceries / Mess Food', value: 'GROCERIES_FOOD' },
            { label: 'Staff Salaries', value: 'SALARIES' },
            { label: 'Miscellaneous', value: 'MISCELLANEOUS' },
          ]}
        />
        <Input
          label="Amount (₹)"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Paid To (Vendor / Person)"
          value={formData.paidTo}
          onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
          placeholder="e.g. Local Electrician"
          required
        />
        <Input
          label="Date of Payment"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Record Expense</Button>
      </div>
    </form>
  );
};
