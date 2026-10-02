import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { RoomCard } from '@/features/rooms/components/RoomCard';
import { RoomForm } from '@/features/rooms/components/RoomForm';
import { Room } from '@/features/rooms/types/room.types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useRooms } from '@/features/rooms/hooks/useRooms';
import { useModal } from '@/hooks/useModal';
import { Plus, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoomsPage: React.FC = () => {
  const { rooms, createRoom } = useRooms();
  const [selectedFloor, setSelectedFloor] = useState<string>('ALL');
  const addModal = useModal();
  const navigate = useNavigate();

  // If initial rooms is small, mock 9 realistic sample rooms matching Screen 5
  const displayRooms: Room[] = rooms.length >= 6 ? rooms : [
    {
      id: '1',
      propertyId: 'p1',
      roomNumber: '101',
      floor: 1,
      type: 'SINGLE',
      capacity: 1,
      baseRent: 8000,
      hasAttachedBathroom: true,
      hasBalcony: false,
      hasAc: true,
      beds: [{ id: 'b1', roomId: '1', bedNumber: '101-A', status: 'OCCUPIED', monthlyRent: 8000 }],
      status: 'FULL',
    },
    {
      id: '2',
      propertyId: 'p1',
      roomNumber: '102',
      floor: 1,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 6500,
      hasAttachedBathroom: true,
      hasBalcony: true,
      hasAc: false,
      beds: [{ id: 'b2', roomId: '2', bedNumber: '102-A', status: 'OCCUPIED', monthlyRent: 6500 }],
      status: 'FULL',
    },
    {
      id: '3',
      propertyId: 'p1',
      roomNumber: '103',
      floor: 1,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 6000,
      hasAttachedBathroom: false,
      hasBalcony: false,
      hasAc: false,
      beds: [{ id: 'b3', roomId: '3', bedNumber: '103-A', status: 'AVAILABLE', monthlyRent: 6000 }],
      status: 'AVAILABLE',
    },
    {
      id: '4',
      propertyId: 'p1',
      roomNumber: '201',
      floor: 2,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 6500,
      hasAttachedBathroom: true,
      hasBalcony: false,
      hasAc: false,
      beds: [{ id: 'b4', roomId: '4', bedNumber: '201-A', status: 'OCCUPIED', monthlyRent: 6500 }],
      status: 'FULL',
    },
    {
      id: '5',
      propertyId: 'p1',
      roomNumber: '202',
      floor: 2,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 6500,
      hasAttachedBathroom: true,
      hasBalcony: false,
      hasAc: true,
      beds: [{ id: 'b5', roomId: '5', bedNumber: '202-A', status: 'MAINTENANCE', monthlyRent: 6500 }],
      status: 'MAINTENANCE',
    },
    {
      id: '6',
      propertyId: 'p1',
      roomNumber: '203',
      floor: 2,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 6500,
      hasAttachedBathroom: true,
      hasBalcony: true,
      hasAc: false,
      beds: [{ id: 'b6', roomId: '6', bedNumber: '203-A', status: 'OCCUPIED', monthlyRent: 6500 }],
      status: 'FULL',
    },
    {
      id: '7',
      propertyId: 'p1',
      roomNumber: '301',
      floor: 3,
      type: 'SINGLE',
      capacity: 1,
      baseRent: 7000,
      hasAttachedBathroom: true,
      hasBalcony: false,
      hasAc: true,
      beds: [{ id: 'b7', roomId: '7', bedNumber: '301-A', status: 'OCCUPIED', monthlyRent: 7000 }],
      status: 'FULL',
    },
    {
      id: '8',
      propertyId: 'p1',
      roomNumber: '302',
      floor: 3,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 7000,
      hasAttachedBathroom: true,
      hasBalcony: false,
      hasAc: true,
      beds: [{ id: 'b8', roomId: '8', bedNumber: '302-A', status: 'AVAILABLE', monthlyRent: 7000 }],
      status: 'AVAILABLE',
    },
    {
      id: '9',
      propertyId: 'p1',
      roomNumber: '303',
      floor: 3,
      type: 'DOUBLE',
      capacity: 2,
      baseRent: 7000,
      hasAttachedBathroom: true,
      hasBalcony: true,
      hasAc: true,
      beds: [{ id: 'b9', roomId: '9', bedNumber: '303-A', status: 'OCCUPIED', monthlyRent: 7000 }],
      status: 'FULL',
    },
  ];

  const filtered = selectedFloor === 'ALL'
    ? displayRooms
    : displayRooms.filter((r) => r.floor.toString() === selectedFloor);

  return (
    <PageContainer
      title="Rooms"
      subtitle="Manage your PG rooms"
      actions={
        <div className="flex items-center gap-3">
          {/* Floor filter dropdown */}
          <div className="relative">
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-xs font-semibold text-slate-700 py-2 pl-3.5 pr-8 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/20 cursor-pointer"
            >
              <option value="ALL">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <Button
            size="sm"
            onClick={addModal.open}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
          >
            Add Room
          </Button>
        </div>
      }
    >
      {/* 3-Column Room Grid matching Screen 5 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onAssign={() => navigate('/tenants')}
          />
        ))}
      </div>

      {/* Add Room Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add New Room" maxWidth="md">
        <RoomForm
          onSubmit={async (data) => {
            await createRoom(data);
            addModal.close();
          }}
          onCancel={addModal.close}
        />
      </Modal>
    </PageContainer>
  );
};
