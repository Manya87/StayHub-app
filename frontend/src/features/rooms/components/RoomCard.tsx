import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Room } from '../types/room.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { MoreHorizontal, UserPlus } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  onSelect?: (room: Room) => void;
  onAssign?: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect, onAssign }) => {
  const isOccupied = room.beds.some((b) => b.status === 'OCCUPIED');
  const isMaintenance = room.beds.some((b) => b.status === 'MAINTENANCE');

  const statusVariant = isMaintenance ? 'warning' : isOccupied ? 'success' : 'danger';
  const statusLabel = isMaintenance ? 'Under Maintenance' : isOccupied ? 'Occupied' : 'Vacant';

  // Sample mock resident name for demonstration if occupied
  const residentName = room.roomNumber === '101' ? 'Rahul Sharma'
    : room.roomNumber === '102' ? 'Amit Kumar'
    : room.roomNumber === '202' ? 'Neha Verma'
    : room.roomNumber === '205' ? 'Priya Singh'
    : room.roomNumber === '301' ? 'Rohan Mehta'
    : room.roomNumber === '303' ? 'Vikas Rao'
    : 'Resident';

  return (
    <Card className="p-4 bg-white border border-[#eef1f6] hover:shadow-card-hover transition-all">
      {/* Header: Room Number, Status Badge, and More dots */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-extrabold text-slate-900">Room {room.roomNumber}</h4>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariant} size="sm">
            {statusLabel}
          </Badge>
          <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Rent / month */}
      <div className="py-3">
        <p className="text-xs font-bold text-slate-900">
          {formatCurrency(room.baseRent)}{' '}
          <span className="text-[11px] font-normal text-slate-400">/ month</span>
        </p>
      </div>

      {/* Footer: Occupant info or Assign Tenant button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {isOccupied ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-[#5d5fef] font-bold text-[10px] flex items-center justify-center">
              {residentName.charAt(0)}
            </div>
            <span className="text-xs font-semibold text-slate-700">{residentName}</span>
          </div>
        ) : (
          <button
            onClick={() => onAssign?.(room)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold text-[#5d5fef] hover:bg-indigo-50 border border-indigo-100 transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Assign Tenant
          </button>
        )}
      </div>
    </Card>
  );
};
