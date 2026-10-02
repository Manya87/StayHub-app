import { api } from '@/services/api';
import { Tenant, CreateTenantDTO } from '../types/tenant.types';

export const tenantApi = {
  getAll: (params?: { propertyId?: string; status?: string }) =>
    api.get<Tenant[]>('/tenants', params),
  getById: (id: string) => api.get<Tenant>(`/tenants/${id}`),
  create: (data: CreateTenantDTO) => api.post<Tenant>('/tenants', data),
  update: (id: string, data: Partial<CreateTenantDTO>) => api.put<Tenant>(`/tenants/${id}`, data),
  delete: (id: string) => api.delete<void>(`/tenants/${id}`),
};
