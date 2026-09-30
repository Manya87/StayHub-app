import { useState, useEffect, useCallback } from 'react';
import { Room, CreateRoomDTO } from '../types/room.types';
import { roomApi } from '../services/roomApi';
import { useUiStore } from '@/store/uiStore';
import { usePropertyStore } from '@/store/propertyStore';

const MOCK_ROOMS: Room[] = [
  {
    id: 'room-1',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    roomNumber: '101',
    floor: 1,
    type: 'DOUBLE',
    capacity: 2,
    hasAttachedBathroom: true,
    hasBalcony: true,
    hasAc: true,
    baseRent: 8500,
    status: 'FULL',
    beds: [
      { id: 'b1', bedNumber: '101-A', status: 'OCCUPIED', monthlyRent: 8500, tenantName: 'Aditya Verma' },
      { id: 'b2', bedNumber: '101-B', status: 'OCCUPIED', monthlyRent: 8500, tenantName: 'Rohan Sharma' },
    ],
  },
  {
    id: 'room-2',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    roomNumber: '102',
    floor: 1,
    type: 'DOUBLE',
    capacity: 2,
    hasAttachedBathroom: true,
    hasBalcony: false,
    hasAc: true,
    baseRent: 8000,
    status: 'AVAILABLE',
    beds: [
      { id: 'b3', bedNumber: '102-A', status: 'OCCUPIED', monthlyRent: 8000, tenantName: 'Kunal Kapoor' },
      { id: 'b4', bedNumber: '102-B', status: 'AVAILABLE', monthlyRent: 8000 },
    ],
  },
  {
    id: 'room-3',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    roomNumber: '201',
    floor: 2,
    type: 'SINGLE',
    capacity: 1,
    hasAttachedBathroom: true,
    hasBalcony: true,
    hasAc: true,
    baseRent: 13000,
    status: 'AVAILABLE',
    beds: [
      { id: 'b5', bedNumber: '201-A', status: 'AVAILABLE', monthlyRent: 13000 },
    ],
  },
  {
    id: 'room-4',
    propertyId: 'prop-1',
    propertyName: 'StayHub Grand Residency',
    roomNumber: '202',
    floor: 2,
    type: 'TRIPLE',
    capacity: 3,
    hasAttachedBathroom: true,
    hasBalcony: false,
    hasAc: false,
    baseRent: 6500,
    status: 'AVAILABLE',
    beds: [
      { id: 'b6', bedNumber: '202-A', status: 'OCCUPIED', monthlyRent: 6500, tenantName: 'Rahul Sen' },
      { id: 'b7', bedNumber: '202-B', status: 'AVAILABLE', monthlyRent: 6500 },
      { id: 'b8', bedNumber: '202-C', status: 'AVAILABLE', monthlyRent: 6500 },
    ],
  },
];

export const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [loading, setLoading] = useState(false);
  const { selectedProperty } = usePropertyStore();
  const { addToast } = useUiStore();

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await roomApi.getAll(selectedProperty?.id);
      if (res.data && res.data.length > 0) {
        setRooms(res.data);
      }
    } catch {
      // Mock data used
    } finally {
      setLoading(false);
    }
  }, [selectedProperty?.id]);

  const createRoom = async (data: CreateRoomDTO) => {
    try {
      const res = await roomApi.create(data);
      if (res.data) setRooms((prev) => [res.data, ...prev]);
    } catch {
      const mockBeds = Array.from({ length: data.capacity }, (_, i) => ({
        id: `bed-${Date.now()}-${i}`,
        bedNumber: `${data.roomNumber}-${String.fromCharCode(65 + i)}`,
        status: 'AVAILABLE' as const,
        monthlyRent: data.baseRent,
      }));

      const newRoom: Room = {
        id: `room-${Date.now()}`,
        ...data,
        status: 'AVAILABLE',
        beds: mockBeds,
      };
      setRooms((prev) => [newRoom, ...prev]);
    }
    addToast('success', `Room ${data.roomNumber} created successfully!`);
  };

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return {
    rooms,
    loading,
    fetchRooms,
    createRoom,
  };
};
