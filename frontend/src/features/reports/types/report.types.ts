export interface FinancialSummaryReport {
  period: string;
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  collectionRate: number;
}

export interface OccupancyReportItem {
  property: string;
  totalBeds: number;
  occupied: number;
  rate: number;
}
