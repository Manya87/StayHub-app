import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ExpenseTable } from '@/features/expenses/components/ExpenseTable';
import { ExpenseForm } from '@/features/expenses/components/ExpenseForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useExpenses } from '@/features/expenses/hooks/useExpenses';
import { useModal } from '@/hooks/useModal';
import { Plus, Filter } from 'lucide-react';

export const ExpensesPage: React.FC = () => {
  const { expenses, loading, addExpense } = useExpenses();
  const [searchTerm, setSearchTerm] = useState('');
  const addModal = useModal();

  const filtered = expenses.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Expenses"
      subtitle="Track all PG expenses"
      actions={
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
          <Button
            size="sm"
            onClick={addModal.open}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
          >
            Add Expense
          </Button>
        </div>
      }
    >
      <ExpenseTable expenses={filtered} isLoading={loading} />

      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Expense" maxWidth="md">
        <ExpenseForm
          onSubmit={async (data) => {
            await addExpense(data);
            addModal.close();
          }}
          onCancel={addModal.close}
        />
      </Modal>
    </PageContainer>
  );
};
