import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { PaymentState } from '../types/payment.types';

export const PaymentStatus: React.FC<{ status: PaymentState }> = ({ status }) => {
  switch (status) {
    case 'PAID':
      return <Badge variant="success">Paid</Badge>;
    case 'PENDING':
      return <Badge variant="warning">Pending</Badge>;
    case 'OVERDUE':
      return <Badge variant="danger">Overdue</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
