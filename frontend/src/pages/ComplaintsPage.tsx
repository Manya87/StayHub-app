import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { ComplaintTable } from '@/features/complaints/components/ComplaintTable';
import { ComplaintForm } from '@/features/complaints/components/ComplaintForm';
import { ComplaintDetails } from '@/features/complaints/components/ComplaintDetails';
import { ComplaintRecord } from '@/features/complaints/types/complaint.types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useComplaints } from '@/features/complaints/hooks/useComplaints';
import { useModal } from '@/hooks/useModal';
import { Plus, Filter } from 'lucide-react';

export const ComplaintsPage: React.FC = () => {
  const { complaints, loading, addComplaint, resolveComplaint } = useComplaints();
  const [activeTab, setActiveTab] = useState<'All' | 'Open' | 'In Progress' | 'Resolved'>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintRecord | null>(null);
  const addModal = useModal();

  const filtered = complaints.filter((c) => {
    if (activeTab === 'Open') return c.status === 'OPEN';
    if (activeTab === 'In Progress') return c.status === 'IN_PROGRESS';
    if (activeTab === 'Resolved') return c.status === 'RESOLVED';
    return true;
  });

  return (
    <PageContainer
      title="Complaints"
      subtitle="Manage tenant complaints"
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
            Add Complaint
          </Button>
        </div>
      }
    >
      {/* Segmented Filter Tabs matching Screen 8 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-5 overflow-x-auto pb-1">
        {(['All', 'Open', 'In Progress', 'Resolved'] as const).map((tab) => (
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

      <ComplaintTable
        complaints={filtered}
        isLoading={loading}
        onSelect={(c) => setSelectedComplaint(c)}
      />

      {/* Add Complaint Modal */}
      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Complaint" maxWidth="md">
        <ComplaintForm
          onSubmit={async (data) => {
            await addComplaint(data);
            addModal.close();
          }}
          onCancel={addModal.close}
        />
      </Modal>

      {/* Complaint Details Modal */}
      <Modal
        isOpen={!!selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
        title="Complaint Details"
        maxWidth="md"
      >
        {selectedComplaint && (
          <ComplaintDetails
            complaint={selectedComplaint}
            onResolve={(id) => {
              resolveComplaint(id);
              setSelectedComplaint(null);
            }}
          />
        )}
      </Modal>
    </PageContainer>
  );
};
