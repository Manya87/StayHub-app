import { api } from '@/services/api';
import {
  DashboardStats,
  OccupancyData,
  RevenueData,
  RecentPaymentItem,
  PendingPaymentItem,
  RecentComplaintItem,
} from '../types/dashboard.types';

export const dashboardApi = {
  getStats: (propertyId?: string) =>
    api.get<DashboardStats>('/dashboard/stats', { propertyId }),
  getOccupancyTrend: (propertyId?: string) =>
    api.get<OccupancyData[]>('/dashboard/occupancy-trend', { propertyId }),
  getRevenueTrend: (propertyId?: string) =>
    api.get<RevenueData[]>('/dashboard/revenue-trend', { propertyId }),
  getRecentPayments: (propertyId?: string) =>
    api.get<RecentPaymentItem[]>('/dashboard/recent-payments', { propertyId }),
  getPendingPayments: (propertyId?: string) =>
    api.get<PendingPaymentItem[]>('/dashboard/pending-payments', { propertyId }),
  getRecentComplaints: (propertyId?: string) =>
    api.get<RecentComplaintItem[]>('/dashboard/recent-complaints', { propertyId }),
};
