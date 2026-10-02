import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/dashboardApi';
import {
  DashboardStats,
  OccupancyData,
  RevenueData,
  RecentPaymentItem,
  PendingPaymentItem,
  RecentComplaintItem,
} from '../types/dashboard.types';
import { usePropertyStore } from '@/store/propertyStore';

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { selectedProperty } = usePropertyStore();

  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 4,
    totalRooms: 68,
    totalBeds: 180,
    occupiedBeds: 158,
    occupancyRate: 88,
    monthlyRevenue: 485000,
    pendingDues: 34000,
    openComplaints: 5,
  });

  const [recentPayments, setRecentPayments] = useState<RecentPaymentItem[]>([
    { id: '1', tenantName: 'Aditya Verma', roomNumber: 'A-201', amount: 8500, date: '2026-09-27', status: 'PAID' },
    { id: '2', tenantName: 'Priya Sharma', roomNumber: 'B-104', amount: 9200, date: '2026-09-26', status: 'PAID' },
    { id: '3', tenantName: 'Rohan Mehra', roomNumber: 'C-302', amount: 7500, date: '2026-09-25', status: 'PAID' },
    { id: '4', tenantName: 'Sneha Patel', roomNumber: 'A-108', amount: 11000, date: '2026-09-24', status: 'PAID' },
  ]);

  const [pendingPayments, setPendingPayments] = useState<PendingPaymentItem[]>([
    { id: '10', tenantName: 'Kunal Kapoor', roomNumber: 'B-205', amount: 9000, dueDate: '2026-10-01' },
    { id: '11', tenantName: 'Ananya Roy', roomNumber: 'A-304', amount: 8500, dueDate: '2026-10-03' },
    { id: '12', tenantName: 'Vikas Gupta', roomNumber: 'C-101', amount: 12000, dueDate: '2026-10-05' },
  ]);

  const [recentComplaints, setRecentComplaints] = useState<RecentComplaintItem[]>([
    { id: 'c1', title: 'WiFi router not connecting in 2nd floor', tenantName: 'Aditya Verma', roomNumber: 'A-201', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: '2026-09-27' },
    { id: 'c2', title: 'Geyser leakage in bathroom', tenantName: 'Rahul Sen', roomNumber: 'B-202', priority: 'URGENT', status: 'OPEN', createdAt: '2026-09-28' },
    { id: 'c3', title: 'AC remote battery replacement', tenantName: 'Sneha Patel', roomNumber: 'A-108', priority: 'LOW', status: 'RESOLVED', createdAt: '2026-09-26' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await dashboardApi.getStats(selectedProperty?.id);
        if (res.data) setStats(res.data);
      } catch {
        // Mock default loaded
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedProperty?.id]);

  return {
    loading,
    stats,
    recentPayments,
    pendingPayments,
    recentComplaints,
  };
};
