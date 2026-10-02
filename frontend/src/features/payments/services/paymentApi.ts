import { api } from '@/services/api';
import { PaymentRecord, CreatePaymentDTO } from '../types/payment.types';

export const paymentApi = {
  getAll: (params?: { propertyId?: string; status?: string }) =>
    api.get<PaymentRecord[]>('/payments', params),
  getById: (id: string) => api.get<PaymentRecord>(`/payments/${id}`),
  create: (data: CreatePaymentDTO) => api.post<PaymentRecord>('/payments', data),
  sendReminder: (id: string) => api.post<{ message: string }>(`/payments/${id}/remind`),
};
