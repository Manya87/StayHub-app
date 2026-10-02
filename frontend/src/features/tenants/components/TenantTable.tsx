import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { ExtendedTenant } from '../hooks/useTenants';
import { MoreHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TenantTableProps {
  tenants: ExtendedTenant[];
  isLoading?: boolean;
}

export const TenantTable: React.FC<TenantTableProps> = ({ tenants, isLoading }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status: ExtendedTenant['status']) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success" size="sm">Active</Badge>;
      case 'NOTICE_PERIOD':
        return <Badge variant="warning" size="sm">Due</Badge>;
      case 'PENDING_CHECKIN':
        return <Badge variant="danger" size="sm">Inactive</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const columns: Column<ExtendedTenant>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-10',
    },
    {
      key: 'name',
      header: 'Name',
      render: (t) => (
        <div className="flex items-center gap-3">
          <img
            src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
            alt={`${t.firstName} ${t.lastName}`}
            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
          />
          <span className="font-bold text-slate-900 block leading-tight">
            {t.firstName} {t.lastName}
          </span>
        </div>
      ),
    },
    {
      key: 'room',
      header: 'Room No.',
      render: (t) => <span className="font-medium text-slate-700">{t.roomNumber}</span>,
    },
    {
      key: 'gender',
      header: 'Gender',
      render: (t) => <span className="text-slate-600">{t.gender || 'Male'}</span>,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (t) => <span className="text-slate-600 font-medium">{t.phone}</span>,
    },
    {
      key: 'checkInDate',
      header: 'Join Date',
      render: (t) => {
        // Formats "2025-04-10" to "10 Apr 2025"
        try {
          const d = new Date(t.checkInDate);
          return (
            <span className="text-slate-500">
              {d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          );
        } catch {
          return <span className="text-slate-500">{t.checkInDate}</span>;
        }
      },
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => getStatusBadge(t.status),
    },
    {
      key: 'action',
      header: 'Action',
      align: 'right',
      render: () => (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={tenants}
      isLoading={isLoading}
      onRowClick={(row) => navigate(`/tenants/${row.id}`)}
    />
  );
};
