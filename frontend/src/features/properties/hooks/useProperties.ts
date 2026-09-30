import { useState, useEffect, useCallback } from 'react';
import { Property, CreatePropertyDTO } from '../types/property.types';
import { propertyApi } from '../services/propertyApi';
import { useUiStore } from '@/store/uiStore';

const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    name: 'StayHub Grand Residency',
    code: 'SH-GR-01',
    address: '42, Koramangala 4th Block, 80ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
    contactNumber: '+91 98765 43210',
    totalRooms: 24,
    totalBeds: 60,
    occupiedBeds: 54,
    status: 'ACTIVE',
    createdAt: '2025-01-10',
  },
  {
    id: 'prop-2',
    name: 'StayHub Prime Suites',
    code: 'SH-PS-02',
    address: '15, HSR Layout Sector 3',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560102',
    contactNumber: '+91 98765 43211',
    totalRooms: 18,
    totalBeds: 45,
    occupiedBeds: 40,
    status: 'ACTIVE',
    createdAt: '2025-03-15',
  },
  {
    id: 'prop-3',
    name: 'StayHub Green Meadows',
    code: 'SH-GM-03',
    address: '88, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    contactNumber: '+91 98765 43212',
    totalRooms: 16,
    totalBeds: 40,
    occupiedBeds: 36,
    status: 'ACTIVE',
    createdAt: '2025-06-20',
  },
  {
    id: 'prop-4',
    name: 'StayHub Urban Living',
    code: 'SH-UL-04',
    address: '07, Whitefield ITPL Main Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    contactNumber: '+91 98765 43213',
    totalRooms: 10,
    totalBeds: 35,
    occupiedBeds: 28,
    status: 'ACTIVE',
    createdAt: '2025-09-01',
  },
];

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [loading, setLoading] = useState(false);
  const { addToast } = useUiStore();

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const res = await propertyApi.getAll();
      if (res.data && res.data.length > 0) {
        setProperties(res.data);
      }
    } catch {
      // Keep mock data for UI demo
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = async (data: CreatePropertyDTO) => {
    try {
      const res = await propertyApi.create(data);
      if (res.data) {
        setProperties((prev) => [res.data, ...prev]);
      }
    } catch {
      const newProp: Property = {
        id: `prop-${Date.now()}`,
        ...data,
        totalRooms: 0,
        totalBeds: 0,
        occupiedBeds: 0,
        status: (data.status as any) || 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
      setProperties((prev) => [newProp, ...prev]);
    }
    addToast('success', 'Property registered successfully!');
  };

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return {
    properties,
    loading,
    fetchProperties,
    createProperty,
  };
};
