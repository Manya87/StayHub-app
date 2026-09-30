import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PaymentTable } from '@/features/payments/components/PaymentTable';
import { PaymentForm } from '@/features/payments/components/PaymentForm';
import { PaymentDetails } from '@/features/payments/components/PaymentDetails';
import { PaymentRecord } from '@/features/payments/types/payment.types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { usePayments } from '@/features/payments/hooks/usePayments';
import { useModal } from '@/hooks/useModal';
import { Plus, Filter } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const { payments, loading, recordPayment } = usePayments();
  const [activeTab, setActiveTab] = useState<'All' | 'Paid' | 'Pending' | 'Partial'>('All');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const addModal = useModal();

  const filtered = payments.filter((p) => {
    if (activeTab === 'Paid') return p.status === 'PAID';
    if (activeTab === 'Pending') return p.status === 'PENDING' || p.status === 'OVERDUE';
    if (activeTab === 'Partial') return p.status === 'PARTIALLY_PAID';
    return true;
  });

  return (
    <PageContainer
      title="Payments"
      subtitle="Track and manage tenant payments"
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
            Record Payment
          </Button>
        </div>
      }
    >
      {/* Segmented Filter Tabs matching Screen 6 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-5 overflow-x-auto pb-1">
        {(['All', 'Paid', 'Pending', 'Partial'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#5d5fef]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <PaymentTable
        payments={filtered}
        isLoading={loading}
        onSelect={(p) => setSelectedPayment(p)}
      />

      {/* Record Payment Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Record Payment" maxWidth="md">
        <PaymentForm
          onSubmit={async (data) => {
            await recordPayment(data);
            addModal.close();
          }}
          onCancel={addModal.close}
        />
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={!!selectedPayment}
        onClose={() => setSelectedPayment(null)}
        title="Transaction Receipt"
        maxWidth="md"
      >
        {selectedPayment && <PaymentDetails payment={selectedPayment} />}
      </Modal>
    </PageContainer>
  );
};
