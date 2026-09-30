import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreatePaymentDTO, PaymentMode } from '../types/payment.types';
import { useTenants } from '@/features/tenants/hooks/useTenants';

interface PaymentFormProps {
  onSubmit: (data: CreatePaymentDTO) => void;
  onCancel: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit, onCancel }) => {
  const { tenants } = useTenants();
  const [formData, setFormData] = useState<CreatePaymentDTO>({
    tenantId: tenants[0]?.id || '',
    amount: 8500,
    paymentType: 'RENT',
    mode: 'UPI',
    transactionReference: '',
    notes: '',
  });

  const tenantOptions = tenants.map((t) => ({
    label: `${t.firstName} ${t.lastName} (Room ${t.roomNumber})`,
    value: t.id,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Select Tenant"
        value={formData.tenantId}
        onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
        options={tenantOptions}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Amount (₹)"
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          required
        />
        <Select
          label="Payment Type"
          value={formData.paymentType}
          onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
          options={[
            { label: 'Monthly Rent', value: 'RENT' },
            { label: 'Security Deposit', value: 'SECURITY_DEPOSIT' },
            { label: 'Mess & Food Charges', value: 'MESS_FEE' },
            { label: 'Maintenance / Damages', value: 'MAINTENANCE' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Payment Mode"
          value={formData.mode}
          onChange={(e) => setFormData({ ...formData, mode: e.target.value as PaymentMode })}
          options={[
            { label: 'UPI / QR', value: 'UPI' },
            { label: 'Net Banking', value: 'NET_BANKING' },
            { label: 'Cash', value: 'CASH' },
            { label: 'Debit / Credit Card', value: 'CARD' },
            { label: 'Direct Bank Transfer', value: 'BANK_TRANSFER' },
          ]}
        />
        <Input
          label="Transaction Ref / UTR"
          value={formData.transactionReference || ''}
          onChange={(e) => setFormData({ ...formData, transactionReference: e.target.value })}
          placeholder="e.g. UTR89123012"
        />
      </div>

      <Input
        label="Notes / Remarks"
        value={formData.notes || ''}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        placeholder="e.g. September rent settled via PhonePe"
      />

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Record Payment</Button>
      </div>
    </form>
  );
};
