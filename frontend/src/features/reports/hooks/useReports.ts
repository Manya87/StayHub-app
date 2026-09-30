import { useState } from 'react';
import { FinancialSummaryReport, OccupancyReportItem } from '../types/report.types';

const MOCK_FINANCIAL: FinancialSummaryReport[] = [
  { period: 'Jan 2026', totalIncome: 420000, totalExpenses: 130000, netProfit: 290000, collectionRate: 98 },
  { period: 'Feb 2026', totalIncome: 435000, totalExpenses: 125000, netProfit: 310000, collectionRate: 97 },
  { period: 'Mar 2026', totalIncome: 450000, totalExpenses: 140000, netProfit: 310000, collectionRate: 99 },
  { period: 'Apr 2026', totalIncome: 440000, totalExpenses: 135000, netProfit: 305000, collectionRate: 96 },
  { period: 'May 2026', totalIncome: 460000, totalExpenses: 145000, netProfit: 315000, collectionRate: 98 },
  { period: 'Jun 2026', totalIncome: 475000, totalExpenses: 150000, netProfit: 325000, collectionRate: 99 },
];

const MOCK_OCCUPANCY: OccupancyReportItem[] = [
  { property: 'StayHub Grand Residency', totalBeds: 60, occupied: 54, rate: 90 },
  { property: 'StayHub Prime Suites', totalBeds: 45, occupied: 40, rate: 89 },
  { property: 'StayHub Green Meadows', totalBeds: 40, occupied: 36, rate: 90 },
  { property: 'StayHub Urban Living', totalBeds: 35, occupied: 28, rate: 80 },
];

export const useReports = () => {
  const [financialData] = useState<FinancialSummaryReport[]>(MOCK_FINANCIAL);
  const [occupancyData] = useState<OccupancyReportItem[]>(MOCK_OCCUPANCY);

  return {
    financialData,
    occupancyData,
  };
};
