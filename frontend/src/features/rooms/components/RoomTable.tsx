import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Room } from '../types/room.types';
import { formatCurrency } from '@/utils/formatCurrency';

interface RoomTableProps {
  rooms: Room[];
  isLoading?: boolean;
  onSelect?: (room: Room) => void;
}

export const RoomTable: React.FC<RoomTableProps> = ({ rooms, isLoading, onSelect }) => {
  const columns: Column<Room>[] = [
    {
      key: 'roomNumber',
      header: 'Room',
      render: (r) => (
        <div>
          <span className="font-bold text-white">Room {r.roomNumber}</span>
          <span className="text-xs text-slate-400 block">Floor {r.floor}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (r) => <span className="text-xs text-slate-300 font-medium">{r.type}</span>,
    },
    {
      key: 'beds',
      header: 'Beds (Occupied / Total)',
      render: (r) => {
        const occ = r.beds.filter((b) => b.status === 'OCCUPIED').length;
        return (
          <span className="text-xs text-slate-300">
            {occ} / {r.capacity} beds
          </span>
        );
      },
    },
    {
      key: 'rent',
      header: 'Rent / Bed',
      render: (r) => (
        <span className="text-xs font-semibold text-emerald-400">{formatCurrency(r.baseRent)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Badge
          variant={
            r.status === 'FULL' ? 'danger' : r.status === 'AVAILABLE' ? 'success' : 'warning'
          }
          size="sm"
        >
          {r.status}
        </Badge>
      ),
    },
  ];

  return <Table columns={columns} data={rooms} isLoading={isLoading} onRowClick={onSelect} />;
};
