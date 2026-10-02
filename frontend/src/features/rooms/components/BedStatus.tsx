import React from 'react';
import { Bed } from '../types/room.types';

export const BedStatus: React.FC<{ bed: Bed }> = ({ bed }) => {
  const isOccupied = bed.status === 'OCCUPIED';

  return (
    <div
      className={`p-3 rounded-xl border text-xs flex flex-col justify-between transition-colors ${
        isOccupied
          ? 'bg-slate-50 border-slate-200 text-slate-800'
          : 'bg-emerald-50 border-emerald-200 text-emerald-800'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900">{bed.bedNumber}</span>
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
          isOccupied ? 'bg-slate-200 text-slate-700' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isOccupied ? 'Occupied' : 'Vacant'}
        </span>
      </div>
      {isOccupied && (
        <span className="text-[11px] text-slate-600 font-medium truncate mt-1.5">
          {bed.tenantName || 'Tenant'}
        </span>
      )}
    </div>
  );
};
