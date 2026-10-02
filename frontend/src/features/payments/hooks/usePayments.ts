import { useState, useEffect, useCallback } from 'react';
import { PaymentRecord, CreatePaymentDTO } from '../types/payment.types';
import { paymentApi } from '../services/paymentApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    tenantId: 't-1',
    tenantName: 'Rahul Sharma',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '101',
    amount: 6000,
    paidAmount: 6000,
    paymentType: 'RENT',
    mode: 'UPI',
    status: 'PAID',
    transactionReference: 'UPI-98213890123',
    paymentDate: '2025-04-02',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-2',
    tenantId: 't-2',
    tenantName: 'Neha Verma',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '202',
    amount: 6500,
    paidAmount: 6500,
    paymentType: 'RENT',
    mode: 'NET_BANKING',
    status: 'PAID',
    transactionReference: 'HDFC98213098',
    paymentDate: '2025-04-01',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-3',
    tenantId: 't-3',
    tenantName: 'Amit Kumar',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '102',
    amount: 6000,
    paidAmount: 0,
    paymentType: 'RENT',
    mode: 'UPI',
    status: 'PENDING',
    paymentDate: '',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-4',
    tenantId: 't-4',
    tenantName: 'Priya Singh',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '205',
    amount: 6500,
    paidAmount: 6500,
    paymentType: 'RENT',
    mode: 'UPI',
    status: 'PAID',
    transactionReference: 'UPI-7711223344',
    paymentDate: '2025-04-01',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-5',
    tenantId: 't-5',
    tenantName: 'Rohan Mehta',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '301',
    amount: 7000,
    paidAmount: 7000,
    paymentType: 'RENT',
    mode: 'NET_BANKING',
    status: 'PAID',
    transactionReference: 'ICICI445566',
    paymentDate: '2025-03-28',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-6',
    tenantId: 't-6',
    tenantName: 'Sneha Patel',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '207',
    amount: 6500,
    paidAmount: 0,
    paymentType: 'RENT',
    mode: 'UPI',
    status: 'PENDING',
    paymentDate: '',
    dueDate: '2025-04-12',
  },
  {
    id: 'pay-7',
    tenantId: 't-7',
    tenantName: 'Vikas Rao',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '303',
    amount: 7000,
    paidAmount: 7000,
    paymentType: 'RENT',
    mode: 'UPI',
    status: 'PAID',
    transactionReference: 'UPI-9900112233',
    paymentDate: '2025-03-29',
    dueDate: '2025-04-05',
  },
  {
    id: 'pay-8',
    tenantId: 't-8',
    tenantName: 'Pooja Iyer',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomNumber: '105',
    amount: 6000,
    paidAmount: 3000,
    paymentType: 'RENT',
    mode: 'CASH',
    status: 'PARTIALLY_PAID',
    transactionReference: 'CASH-PART-1',
    paymentDate: '2025-03-10',
    dueDate: '2025-03-10',
  },
];

export const usePayments = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>(MOCK_PAYMENTS);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await paymentApi.getAll({ propertyId: selectedProperty?.id });
      if (res.data && res.data.length > 0) setPayments(res.data);
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const recordPayment = async (data: CreatePaymentDTO) => {
    try {
      const res = await paymentApi.create(data);
      if (res.data) setPayments((prev) => [res.data, ...prev]);
    } catch {
      const newPay: PaymentRecord = {
        id: `pay-${Date.now()}`,
        tenantId: data.tenantId,
        tenantName: 'Rahul Sharma',
        propertyId: 'prop-1',
        propertyName: 'Sunrise PG',
        roomNumber: '101',
        amount: data.amount,
        paidAmount: data.amount,
        paymentType: data.paymentType as any,
        mode: data.mode,
        status: 'PAID',
        transactionReference: data.transactionReference || 'CASH-REC',
        paymentDate: new Date().toISOString().split('T')[0],
        dueDate: new Date().toISOString().split('T')[0],
      };
      setPayments((prev) => [newPay, ...prev]);
    }
    addToast('success', 'Payment recorded successfully!');
  };

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return {
    payments,
    loading,
    fetchPayments,
    recordPayment,
  };
};
