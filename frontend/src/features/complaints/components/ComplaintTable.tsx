import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ComplaintRecord } from '../types/complaint.types';
import { formatDate } from '@/utils/formatDate';
import { MoreHorizontal } from 'lucide-react';

interface ComplaintTableProps {
  complaints: ComplaintRecord[];
  isLoading?: boolean;
  onSelect?: (complaint: ComplaintRecord) => void;
}

export const ComplaintTable: React.FC<ComplaintTableProps> = ({
  complaints,
  isLoading,
  onSelect,
}) => {
  const getStatusBadge = (status: ComplaintRecord['status']) => {
    switch (status) {
      case 'OPEN':
        return <Badge variant="danger" size="sm">Open</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="warning" size="sm">In Progress</Badge>;
      case 'RESOLVED':
        return <Badge variant="success" size="sm">Resolved</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const columns: Column<ComplaintRecord>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'tenant',
      header: 'Tenant',
      render: (c) => <span className="font-bold text-slate-900">{c.tenantName}</span>,
    },
    {
      key: 'room',
      header: 'Room',
      render: (c) => <span className="font-semibold text-slate-700">{c.roomNumber}</span>,
    },
    {
      key: 'title',
      header: 'Issue',
      render: (c) => <span className="font-semibold text-slate-800">{c.title}</span>,
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (c) => <span className="text-slate-500 font-medium">{formatDate(c.createdAt)}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => getStatusBadge(c.status),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: () => (
        <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return <Table columns={columns} data={complaints} isLoading={isLoading} onRowClick={onSelect} />;
};
