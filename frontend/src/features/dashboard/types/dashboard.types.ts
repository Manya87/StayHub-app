export interface DashboardStats {
  totalProperties: number;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  occupancyRate: number;
  monthlyRevenue: number;
  pendingDues: number;
  openComplaints: number;
}

export interface OccupancyData {
  month: string;
  occupancyRate: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  expenses: number;
}

export interface RecentPaymentItem {
  id: string;
  tenantName: string;
  roomNumber: string;
  amount: number;
  date: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface PendingPaymentItem {
  id: string;
  tenantName: string;
  roomNumber: string;
  amount: number;
  dueDate: string;
}

export interface RecentComplaintItem {
  id: string;
  title: string;
  tenantName: string;
  roomNumber: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}
