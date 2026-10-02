import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Property } from '../types/property.types';
import { useNavigate } from 'react-router-dom';

interface PropertyTableProps {
  properties: Property[];
  isLoading?: boolean;
}

export const PropertyTable: React.FC<PropertyTableProps> = ({ properties, isLoading }) => {
  const navigate = useNavigate();

  const columns: Column<Property>[] = [
    {
      key: 'name',
      header: 'Property',
      render: (row) => (
        <div>
          <span className="font-semibold text-white block">{row.name}</span>
          <span className="text-xs text-slate-400 font-mono">{row.code}</span>
        </div>
      ),
    },
    {
      key: 'city',
      header: 'Location',
      render: (row) => (
        <span className="text-xs text-slate-300">
          {row.city}, {row.state}
        </span>
      ),
    },
    {
      key: 'rooms',
      header: 'Rooms / Beds',
      render: (row) => (
        <span className="text-xs text-slate-300">
          {row.totalRooms} rms / {row.totalBeds} beds
        </span>
      ),
    },
    {
      key: 'occupancy',
      header: 'Occupancy',
      render: (row) => {
        const rate = row.totalBeds > 0 ? Math.round((row.occupiedBeds / row.totalBeds) * 100) : 0;
        return (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-400">{rate}%</span>
            <span className="text-[11px] text-slate-500">({row.occupiedBeds} occ)</span>
          </div>
        );
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'ACTIVE' ? 'success' : 'warning'} size="sm">
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={properties}
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/properties/${row.id}`)}
    />
  );
};
