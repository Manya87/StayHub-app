import { useState, useEffect, useCallback } from 'react';
import { Tenant, CreateTenantDTO } from '../types/tenant.types';
import { tenantApi } from '../services/tenantApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

export interface ExtendedTenant extends Tenant {
  gender?: string;
  avatar?: string;
}

const MOCK_TENANTS: ExtendedTenant[] = [
  {
    id: 't-1',
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: 'rahul.sharma@example.com',
    phone: '9876543210',
    emergencyContact: '9876543211',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-1',
    roomNumber: '101',
    bedId: 'b1',
    bedNumber: '101-A',
    monthlyRent: 6000,
    securityDeposit: 12000,
    checkInDate: '2025-04-10',
    status: 'ACTIVE',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-1234',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-2',
    firstName: 'Neha',
    lastName: 'Verma',
    email: 'neha.verma@example.com',
    phone: '8765432109',
    emergencyContact: '8765432100',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-2',
    roomNumber: '202',
    bedId: 'b2',
    bedNumber: '202-A',
    monthlyRent: 6500,
    securityDeposit: 13000,
    checkInDate: '2025-04-08',
    status: 'ACTIVE',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-5678',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-3',
    firstName: 'Amit',
    lastName: 'Kumar',
    email: 'amit.kumar@example.com',
    phone: '9123456780',
    emergencyContact: '9123456788',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-3',
    roomNumber: '102',
    bedId: 'b3',
    bedNumber: '102-A',
    monthlyRent: 6000,
    securityDeposit: 12000,
    checkInDate: '2025-04-05',
    status: 'NOTICE_PERIOD', // Displays as Due Payment
    idProofType: 'PAN Card',
    idProofNumber: 'ABCDE1234F',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-4',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@example.com',
    phone: '8887766544',
    emergencyContact: '8887766540',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-4',
    roomNumber: '205',
    bedId: 'b4',
    bedNumber: '205-A',
    monthlyRent: 6500,
    securityDeposit: 13000,
    checkInDate: '2025-04-01',
    status: 'ACTIVE',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-9999',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-5',
    firstName: 'Rohan',
    lastName: 'Mehta',
    email: 'rohan.mehta@example.com',
    phone: '8877665544',
    emergencyContact: '8877665500',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-5',
    roomNumber: '301',
    bedId: 'b5',
    bedNumber: '301-A',
    monthlyRent: 7000,
    securityDeposit: 14000,
    checkInDate: '2025-03-28',
    status: 'ACTIVE',
    idProofType: 'Passport',
    idProofNumber: 'P1234567',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-6',
    firstName: 'Sneha',
    lastName: 'Patel',
    email: 'sneha.patel@example.com',
    phone: '7766554433',
    emergencyContact: '7766554400',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-6',
    roomNumber: '207',
    bedId: 'b6',
    bedNumber: '207-A',
    monthlyRent: 6500,
    securityDeposit: 13000,
    checkInDate: '2025-03-25',
    status: 'ACTIVE',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-4444',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-7',
    firstName: 'Vikas',
    lastName: 'Rao',
    email: 'vikas.rao@example.com',
    phone: '9988776655',
    emergencyContact: '9988776600',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-7',
    roomNumber: '303',
    bedId: 'b7',
    bedNumber: '303-A',
    monthlyRent: 7000,
    securityDeposit: 14000,
    checkInDate: '2025-03-20',
    status: 'ACTIVE',
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-3333',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 't-8',
    firstName: 'Pooja',
    lastName: 'Iyer',
    email: 'pooja.iyer@example.com',
    phone: '8899001122',
    emergencyContact: '8899001100',
    propertyId: 'prop-1',
    propertyName: 'Sunrise PG',
    roomId: 'room-8',
    roomNumber: '105',
    bedId: 'b8',
    bedNumber: '105-A',
    monthlyRent: 6000,
    securityDeposit: 12000,
    checkInDate: '2025-03-18',
    status: 'PENDING_CHECKIN', // Displays as Inactive
    idProofType: 'Aadhaar Card',
    idProofNumber: 'XXXX-XXXX-2222',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
  },
];

export const useTenants = () => {
  const [tenants, setTenants] = useState<ExtendedTenant[]>(MOCK_TENANTS);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    try {
      const res = await tenantApi.getAll({ propertyId: selectedProperty?.id });
      if (res.data && res.data.length > 0) {
        // augment
        setTenants(res.data);
      }
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const createTenant = async (data: CreateTenantDTO) => {
    try {
      const res = await tenantApi.create(data);
      if (res.data) setTenants((prev) => [res.data, ...prev]);
    } catch {
      const newTenant: ExtendedTenant = {
        id: `t-${Date.now()}`,
        ...data,
        roomNumber: '101',
        bedNumber: '101-B',
        status: 'ACTIVE',
        gender: 'Male',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      };
      setTenants((prev) => [newTenant, ...prev]);
    }
    addToast('success', `Tenant ${data.firstName} ${data.lastName} onboarded!`);
  };

  useEffect(() => {
    fetchTenants();
  }, [fetchTenants]);

  return {
    tenants,
    loading,
    fetchTenants,
    createTenant,
  };
};
