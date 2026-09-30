import React from 'react';
import { PaymentRecord } from '../types/payment.types';
import { Card } from '@/components/ui/Card';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formatDate';
import { PaymentReceipt } from './PaymentReceipt';

export const PaymentDetails: React.FC<{ payment: PaymentRecord }> = ({ payment }) => {
  return (
    <div className="space-y-4">
      <PaymentReceipt payment={payment} />
    </div>
  );
};
