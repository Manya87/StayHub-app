import React from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { StaffList } from '@/features/staff/components/StaffList';
import { StaffForm } from '@/features/staff/components/StaffForm';
import { useStaff } from '@/features/staff/hooks/useStaff';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export const StaffPage: React.FC = () => {
  const { staff, loading, addStaff } = useStaff();
  const addModal = useModal();

  return (
    <PageContainer
      title="Staff Management"
      subtitle="Manage PG staff members"
      actions={
        <Button
          size="sm"
          onClick={addModal.open}
          leftIcon={<Plus className="w-4 h-4" />}
          className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
        >
          Add Staff
        </Button>
      }
    >
      <StaffList staff={staff} />

      <Modal isOpen={addModal.isOpen} onClose={addModal.close} title="Add Staff Member" maxWidth="md">
        <StaffForm
          onSubmit={async (data) => {
            await addStaff(data);
            addModal.close();
          }}
          onCancel={addModal.close}
        />
      </Modal>
    </PageContainer>
  );
};
