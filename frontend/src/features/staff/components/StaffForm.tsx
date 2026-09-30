import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreateStaffDTO, StaffRole } from '../types/staff.types';
import { useProperties } from '@/features/properties/hooks/useProperties';

interface StaffFormProps {
  onSubmit: (data: CreateStaffDTO) => void;
  onCancel: () => void;
}

export const StaffForm: React.FC<StaffFormProps> = ({ onSubmit, onCancel }) => {
  const { properties } = useProperties();
  const [formData, setFormData] = useState<CreateStaffDTO>({
    propertyId: properties[0]?.id || '',
    name: '',
    role: 'HOUSEKEEPING',
    phone: '',
    salary: 16000,
    shift: 'DAY',
  });

  const propertyOptions = properties.map((p) => ({ label: p.name, value: p.id }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Property Assignment"
        value={formData.propertyId}
        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
        options={propertyOptions}
        required
      />

      <Input
        label="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Staff employee full name"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Designation / Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffRole })}
          options={[
            { label: 'Property Manager', value: 'PROPERTY_MANAGER' },
            { label: 'Hostel Warden', value: 'WARDEN' },
            { label: 'Head Chef', value: 'HEAD_CHEF' },
            { label: 'Housekeeping Staff', value: 'HOUSEKEEPING' },
            { label: 'Security Guard', value: 'SECURITY_GUARD' },
            { label: 'Electrician / Plumber', value: 'ELECTRICIAN' },
          ]}
        />
        <Select
          label="Work Shift"
          value={formData.shift}
          onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
          options={[
            { label: 'Day Shift (8 AM - 4 PM)', value: 'DAY' },
            { label: 'Night Shift (8 PM - 4 AM)', value: 'NIGHT' },
            { label: 'Rotational Shift', value: 'ROTATIONAL' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91 "
          required
        />
        <Input
          label="Monthly Salary (₹)"
          type="number"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
          required
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Staff Member</Button>
      </div>
    </form>
  );
};
