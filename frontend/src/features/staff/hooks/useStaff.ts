import { useState, useEffect, useCallback } from 'react';
import { StaffRecord, CreateStaffDTO } from '../types/staff.types';
import { staffApi } from '../services/staffApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

const MOCK_STAFF: StaffRecord[] = [
  {
    id: 'st-1',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    name: 'Suresh Kumar',
    role: 'PROPERTY_MANAGER',
    phone: '+91 98450 12345',
    salary: 35000,
    shift: 'DAY',
    joiningDate: '2024-01-15',
    status: 'ACTIVE',
  },
  {
    id: 'st-2',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    name: 'Manjunath Gowda',
    role: 'HEAD_CHEF',
    phone: '+91 98450 23456',
    salary: 28000,
    shift: 'ROTATIONAL',
    joiningDate: '2024-03-01',
    status: 'ACTIVE',
  },
  {
    id: 'st-3',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    name: 'Ramesh Bahadur',
    role: 'SECURITY_GUARD',
    phone: '+91 98450 34567',
    salary: 18000,
    shift: 'NIGHT',
    joiningDate: '2024-06-10',
    status: 'ACTIVE',
  },
];

export const useStaff = () => {
  const [staff, setStaff] = useState<StaffRecord[]>(MOCK_STAFF);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    try {
      const res = await staffApi.getAll(selectedProperty?.id);
      if (res.data && res.data.length > 0) setStaff(res.data);
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const addStaff = async (data: CreateStaffDTO) => {
    try {
      const res = await staffApi.create(data);
      if (res.data) setStaff((prev) => [res.data, ...prev]);
    } catch {
      const newStaff: StaffRecord = {
        id: `st-${Date.now()}`,
        ...data,
        shift: data.shift as any,
        joiningDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE',
      };
      setStaff((prev) => [newStaff, ...prev]);
    }
    addToast('success', 'Staff member appointed!');
  };

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return {
    staff,
    loading,
    fetchStaff,
    addStaff,
  };
};
