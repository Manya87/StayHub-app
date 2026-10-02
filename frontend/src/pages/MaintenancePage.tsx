import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Table, Column } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  room: string;
  issue: string;
  assignedTo: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const initialTasks: MaintenanceTask[] = [
  { id: '1', room: '202', issue: 'Fan repair', assignedTo: 'Staff', date: '05 Apr 2025', status: 'Completed' },
  { id: '2', room: '101', issue: 'AC service', assignedTo: 'Technician', date: '04 Apr 2025', status: 'In Progress' },
  { id: '3', room: '301', issue: 'Light not working', assignedTo: 'Staff', date: '03 Apr 2025', status: 'Pending' },
  { id: '4', room: '105', issue: 'Plumbing issue', assignedTo: 'Plumber', date: '01 Apr 2025', status: 'Completed' },
];

export const MaintenancePage: React.FC = () => {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasks);
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');
  const addModal = useModal();

  const [newRoom, setNewRoom] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newAssigned, setNewAssigned] = useState('Staff');

  const filtered = tasks.filter((t) => {
    if (activeTab === 'Pending') return t.status === 'Pending';
    if (activeTab === 'In Progress') return t.status === 'In Progress';
    if (activeTab === 'Completed') return t.status === 'Completed';
    return true;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: MaintenanceTask = {
      id: String(Date.now()),
      room: newRoom,
      issue: newIssue,
      assignedTo: newAssigned,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Pending',
    };
    setTasks([newTask, ...tasks]);
    addModal.close();
    setNewRoom('');
    setNewIssue('');
  };

  const columns: Column<MaintenanceTask>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'room',
      header: 'Room',
      render: (t) => <span className="font-bold text-slate-900">{t.room}</span>,
    },
    {
      key: 'issue',
      header: 'Issue',
      render: (t) => <span className="font-semibold text-slate-800">{t.issue}</span>,
    },
    {
      key: 'assignedTo',
      header: 'Assigned To',
      render: (t) => <span className="text-slate-600">{t.assignedTo}</span>,
    },
    {
      key: 'date',
      header: 'Date',
      render: (t) => <span className="text-slate-500 font-medium">{t.date}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => (
        <Badge
          variant={
            t.status === 'Completed' ? 'success' : t.status === 'In Progress' ? 'warning' : 'danger'
          }
          size="sm"
        >
          {t.status}
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

  return (
    <PageContainer
      title="Maintenance"
      subtitle="Track room maintenance"
      actions={
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
          </button>
          <Button
            size="sm"
            onClick={addModal.open}
            leftIcon={<Plus className="w-4 h-4" />}
            className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
          >
            Add Maintenance
          </Button>
        </div>
      }
    >
      {/* Segmented Filter Tabs matching Screen 9 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-5 overflow-x-auto pb-1">
        {(['All', 'Pending', 'In Progress', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#5d5fef]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
            )}
          </button>
        ))}
      </div>

      <Table columns={columns} data={filtered} />

      {/* Add Maintenance Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Maintenance Request" maxWidth="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Room No. *"
            value={newRoom}
            onChange={(e) => setNewRoom(e.target.value)}
            placeholder="e.g. 102"
            required
          />
          <Input
            label="Issue Description *"
            value={newIssue}
            onChange={(e) => setNewIssue(e.target.value)}
            placeholder="e.g. Tap leaking / Fan repair"
            required
          />
          <Select
            label="Assign To *"
            value={newAssigned}
            onChange={(e) => setNewAssigned(e.target.value)}
            options={[
              { label: 'Staff', value: 'Staff' },
              { label: 'Technician', value: 'Technician' },
              { label: 'Plumber', value: 'Plumber' },
              { label: 'Electrician', value: 'Electrician' },
            ]}
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" type="button" onClick={addModal.close}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#5d5fef] text-white">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};
