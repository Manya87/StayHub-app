import { api } from '@/services/api';
import { FinancialSummaryReport, OccupancyReportItem } from '../types/report.types';

export const reportApi = {
  getFinancialSummary: (year?: number) =>
    api.get<FinancialSummaryReport[]>('/reports/financial', { year }),
  getOccupancyReport: () => api.get<OccupancyReportItem[]>('/reports/occupancy'),
};
