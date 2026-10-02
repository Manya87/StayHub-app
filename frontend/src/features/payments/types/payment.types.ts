export type PaymentMode = 'UPI' | 'NET_BANKING' | 'CASH' | 'CARD' | 'BANK_TRANSFER';
export type PaymentState = 'PAID' | 'PENDING' | 'FAILED' | 'OVERDUE' | 'PARTIALLY_PAID';

export interface PaymentRecord {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  roomNumber: string;
  amount: number;
  paidAmount: number;
  paymentType: 'RENT' | 'SECURITY_DEPOSIT' | 'MESS_FEE' | 'MAINTENANCE';
  mode: PaymentMode;
  status: PaymentState;
  transactionReference?: string;
  paymentDate: string;
  dueDate: string;
  notes?: string;
}

export interface CreatePaymentDTO {
  tenantId: string;
  amount: number;
  paymentType: string;
  mode: PaymentMode;
  transactionReference?: string;
  notes?: string;
}
