import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Table, Column } from '@/components/ui/Table';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useModal } from '@/hooks/useModal';
import { Plus, Filter, MoreHorizontal } from 'lucide-react';

interface Visitor {
  id: string;
  name: string;
  whomToMeet: string;
  phone: string;
  checkIn: string;
  checkOut: string;
}

const initialVisitors: Visitor[] = [
  { id: '1', name: 'Suresh Kumar', whomToMeet: 'Rahul Sharma', phone: '9876543210', checkIn: '02:15 PM', checkOut: '04:00 PM' },
  { id: '2', name: 'Anjali Mehta', whomToMeet: 'Neha Verma', phone: '9123456780', checkIn: '11:00 AM', checkOut: '12:30 PM' },
  { id: '3', name: 'Karan Singh', whomToMeet: 'Amit Kumar', phone: '9988776655', checkIn: '10:30 AM', checkOut: '11:00 AM' },
  { id: '4', name: 'Meera Patel', whomToMeet: 'Priya Singh', phone: '8887766544', checkIn: '05:00 PM', checkOut: '--' },
  { id: '5', name: 'Rahul Joshi', whomToMeet: 'Rohan Mehta', phone: '7766554433', checkIn: '04:30 PM', checkOut: '--' },
];

export const VisitorsPage: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const addModal = useModal();

  const [name, setName] = useState('');
  const [whomToMeet, setWhomToMeet] = useState('');
  const [phone, setPhone] = useState('');
  const [checkIn, setCheckIn] = useState('03:00 PM');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newVisitor: Visitor = {
      id: String(Date.now()),
      name,
      whomToMeet,
      phone,
      checkIn: checkIn || 'Just now',
      checkOut: '--',
    };
    setVisitors([newVisitor, ...visitors]);
    addModal.close();
    setName('');
    setWhomToMeet('');
    setPhone('');
  };

  const columns: Column<Visitor>[] = [
    {
      key: 'index',
      header: '#',
      render: (_, idx) => <span className="text-slate-400 font-medium">{(idx ?? 0) + 1}</span>,
      className: 'w-12',
    },
    {
      key: 'name',
      header: 'Name',
      render: (v) => <span className="font-bold text-slate-900">{v.name}</span>,
    },
    {
      key: 'whomToMeet',
      header: 'Whom to Meet',
      render: (v) => <span className="font-semibold text-slate-700">{v.whomToMeet}</span>,
    },
    {
      key: 'phone',
      header: 'Phone',
      render: (v) => <span className="text-slate-600 font-medium">{v.phone}</span>,
    },
    {
      key: 'checkIn',
      header: 'Check-in',
      render: (v) => <span className="text-slate-500 font-medium">{v.checkIn}</span>,
    },
    {
      key: 'checkOut',
      header: 'Check-out',
      render: (v) => (
        <span className={v.checkOut === '--' ? 'text-amber-600 font-bold' : 'text-slate-500 font-medium'}>
          {v.checkOut}
        </span>
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
      title="Visitors"
      subtitle="Track PG visitors"
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
            Add Entry
          </Button>
        </div>
      }
    >
      <Table columns={columns} data={visitors} />

      {/* Add Visitor Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Visitor Entry" maxWidth="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            label="Visitor Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Suresh Kumar"
            required
          />
          <Input
            label="Whom to Meet (Resident Name / Room) *"
            value={whomToMeet}
            onChange={(e) => setWhomToMeet(e.target.value)}
            placeholder="e.g. Rahul Sharma"
            required
          />
          <Input
            label="Phone Number *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter visitor phone number"
            required
          />
          <Input
            label="Check-in Time"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            placeholder="e.g. 02:15 PM"
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" type="button" onClick={addModal.close}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#5d5fef] text-white">
              Save Entry
            </Button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
};
