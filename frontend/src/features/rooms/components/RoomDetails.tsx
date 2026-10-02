import React from 'react';
import { Room } from '../types/room.types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/formatCurrency';
import { BedStatus } from './BedStatus';

export const RoomDetails: React.FC<{ room: Room }> = ({ room }) => {
  return (
    <div className="space-y-4">
      <Card className="p-5 bg-white border border-[#eef1f6]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Room {room.roomNumber}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Floor {room.floor} • {room.type}</p>
          </div>
          <Badge variant={room.status === 'AVAILABLE' ? 'success' : 'warning'}>
            {room.status}
          </Badge>
        </div>

        <div className="pt-3 space-y-3">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Base Rent / Bed:</span>
            <span className="font-bold text-slate-900">{formatCurrency(room.baseRent)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Attached Washroom:</span>
            <span className="text-slate-800 font-semibold">{room.hasAttachedBathroom ? 'Yes' : 'No'}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Air Conditioned:</span>
            <span className="text-slate-800 font-semibold">{room.hasAc ? 'Yes' : 'No'}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Bed Allocations</h4>
          <div className="space-y-2">
            {room.beds.map((bed) => (
              <BedStatus key={bed.id} bed={bed} />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
