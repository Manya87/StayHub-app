import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { MessMember } from '../types/mess.types';

export const MessMembers: React.FC<{ members: MessMember[] }> = ({ members }) => {
  const columns: Column<MessMember>[] = [
    {
      key: 'tenantName',
      header: 'Tenant Name',
      render: (m) => (
        <div>
          <span className="font-semibold text-white">{m.tenantName}</span>
          <span className="text-xs text-slate-400 block">Room {m.roomNumber}</span>
        </div>
      ),
    },
    {
      key: 'mealPlan',
      header: 'Subscribed Plan',
      render: (m) => <span className="text-xs text-slate-300 font-medium">{m.mealPlan}</span>,
    },
    {
      key: 'dietType',
      header: 'Diet',
      render: (m) => (
        <Badge variant={m.dietType === 'VEG' ? 'success' : 'danger'} size="sm">
          {m.dietType}
        </Badge>
      ),
    },
  ];

  return <Table columns={columns} data={members} />;
};
