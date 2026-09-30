import { useState, useEffect, useCallback } from 'react';
import { ComplaintRecord, CreateComplaintDTO, ComplaintState } from '../types/complaint.types';
import { complaintApi } from '../services/complaintApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

const MOCK_COMPLAINTS: ComplaintRecord[] = [
  {
    id: 'cmp-1',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    tenantId: 't-5',
    tenantName: 'Rohan Mehta',
    roomNumber: '301',
    title: 'WiFi not working',
    description: 'WiFi router not connecting in Room 301.',
    category: 'WIFI_INTERNET',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '2025-04-14',
  },
  {
    id: 'cmp-2',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    tenantId: 't-2',
    tenantName: 'Neha Verma',
    roomNumber: '201',
    title: 'Fan not working',
    description: 'Ceiling fan stopped rotating properly.',
    category: 'ELECTRICAL',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: '2025-04-12',
  },
  {
    id: 'cmp-3',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    tenantId: 't-3',
    tenantName: 'Amit Kumar',
    roomNumber: '102',
    title: 'Water supply low',
    description: 'Bathroom tap water pressure is very low.',
    category: 'PLUMBING',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    createdAt: '2025-04-10',
    resolvedAt: '2025-04-10',
  },
  {
    id: 'cmp-4',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    tenantId: 't-4',
    tenantName: 'Priya Singh',
    roomNumber: '205',
    title: 'AC not cooling',
    description: 'AC blowing normal air without cooling effect.',
    category: 'ELECTRICAL',
    priority: 'HIGH',
    status: 'OPEN',
    createdAt: '2025-04-08',
  },
  {
    id: 'cmp-5',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    tenantId: 't-6',
    tenantName: 'Sneha Patel',
    roomNumber: '207',
    title: 'Door lock issue',
    description: 'Handle key latch sticking while unlocking.',
    category: 'CARPENTRY',
    priority: 'LOW',
    status: 'RESOLVED',
    createdAt: '2025-04-05',
    resolvedAt: '2025-04-05',
  },
];

export const useComplaints = () => {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(MOCK_COMPLAINTS);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const res = await complaintApi.getAll({ propertyId: selectedProperty?.id });
      if (res.data && res.data.length > 0) setComplaints(res.data);
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const addComplaint = async (data: CreateComplaintDTO) => {
    try {
      const res = await complaintApi.create(data);
      if (res.data) setComplaints((prev) => [res.data, ...prev]);
    } catch {
      const newCmp: ComplaintRecord = {
        id: `cmp-${Date.now()}`,
        ...data,
        category: data.category as any,
        tenantName: 'Rohan Mehta',
        roomNumber: '301',
        status: 'OPEN',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setComplaints((prev) => [newCmp, ...prev]);
    }
    addToast('success', 'Complaint logged!');
  };

  const resolveComplaint = async (id: string, notes?: string) => {
    try {
      await complaintApi.updateStatus(id, 'RESOLVED', notes);
    } catch {
      // fallback
    }
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: 'RESOLVED', resolvedAt: new Date().toISOString().split('T')[0], resolutionNotes: notes }
          : c
      )
    );
    addToast('success', 'Complaint marked as resolved!');
  };

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  return {
    complaints,
    loading,
    fetchComplaints,
    addComplaint,
    resolveComplaint,
  };
};
