import React from 'react';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { StaffRecord } from '../types/staff.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { MoreHorizontal } from 'lucide-react';

export const StaffList: React.FC<{ staff: StaffRecord[] }> = ({ staff }) => {
  const sampleStaff = staff.length > 0 ? staff : [
    { id: '1', name: 'Sita Devi', role: 'Cook', phone: '9876543210', salary: 7000, status: 'Active', shift: 'Morning' },
    { id: '2', name: 'Ramesh Kumar', role: 'Cleaner', phone: '9765432109', salary: 6000, status: 'Active', shift: 'Day' },
    { id: '3', name: 'Mohan Lal', role: 'Guard', phone: '9123456780', salary: 7000, status: 'Active', shift: 'Night' },
    { id: '4', name: 'Sunita Sharma', role: 'Helper', phone: '9988776655', salary: 6000, status: 'Inactive', shift: 'Morning' },
  ];

  const columns: Column<any>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'name',
      header: 'Name',
      render: (s) => <span className="font-bold text-slate-900">{s.name}</span>,
    },
    {
      key: 'role',
      header: 'Role',
      render: (s) => <span className="text-slate-600 font-medium">{s.role}</span>,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (s) => <span className="text-slate-600 font-medium">{s.phone}</span>,
    },
    {
      key: 'salary',
      header: 'Salary',
      render: (s) => (
        <span className="font-semibold text-slate-900">{formatCurrency(s.salary)}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (s) => (
        <Badge variant={s.status === 'Active' ? 'success' : 'danger'} size="sm">
          {s.status}
        </Badge>
      ),
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

  return <Table columns={columns} data={sampleStaff} />;
};
