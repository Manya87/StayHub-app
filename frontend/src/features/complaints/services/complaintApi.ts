import { api } from '@/services/api';
import { ComplaintRecord, CreateComplaintDTO, ComplaintState } from '../types/complaint.types';

export const complaintApi = {
  getAll: (params?: { propertyId?: string; status?: string }) =>
    api.get<ComplaintRecord[]>('/complaints', params),
  getById: (id: string) => api.get<ComplaintRecord>(`/complaints/${id}`),
  create: (data: CreateComplaintDTO) => api.post<ComplaintRecord>('/complaints', data),
  updateStatus: (id: string, status: ComplaintState, resolutionNotes?: string) =>
    api.put<ComplaintRecord>(`/complaints/${id}/status`, { status, resolutionNotes }),
};
