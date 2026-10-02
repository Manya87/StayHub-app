import { api } from '@/services/api';
import { Property, CreatePropertyDTO } from '../types/property.types';

export const propertyApi = {
  getAll: () => api.get<Property[]>('/properties'),
  getById: (id: string) => api.get<Property>(`/properties/${id}`),
  create: (data: CreatePropertyDTO) => api.post<Property>('/properties', data),
  update: (id: string, data: Partial<CreatePropertyDTO>) =>
    api.put<Property>(`/properties/${id}`, data),
  delete: (id: string) => api.delete<void>(`/properties/${id}`),
};
