import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreateComplaintDTO, ComplaintPriority } from '../types/complaint.types';
import { useTenants } from '@/features/tenants/hooks/useTenants';
import { useProperties } from '@/features/properties/hooks/useProperties';

interface ComplaintFormProps {
  onSubmit: (data: CreateComplaintDTO) => void;
  onCancel: () => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ onSubmit, onCancel }) => {
  const { properties } = useProperties();
  const { tenants } = useTenants();

  const [formData, setFormData] = useState<CreateComplaintDTO>({
    propertyId: properties[0]?.id || '',
    tenantId: tenants[0]?.id || '',
    title: '',
    description: '',
    category: 'PLUMBING',
    priority: 'MEDIUM',
  });

  const propertyOptions = properties.map((p) => ({ label: p.name, value: p.id }));
  const tenantOptions = tenants.map((t) => ({
    label: `${t.firstName} ${t.lastName} (Room ${t.roomNumber})`,
    value: t.id,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Property"
          value={formData.propertyId}
          onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
          options={propertyOptions}
          required
        />
        <Select
          label="Tenant / Room"
          value={formData.tenantId}
          onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
          options={tenantOptions}
          required
        />
      </div>

      <Input
        label="Issue Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="e.g. Geyser not heating water"
        required
      />

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Detailed Description
        </label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe the complaint in detail..."
          className="w-full rounded-lg bg-slate-900 border border-slate-700 text-slate-100 p-3 text-xs focus:outline-none focus:border-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            { label: 'Plumbing', value: 'PLUMBING' },
            { label: 'Electrical', value: 'ELECTRICAL' },
            { label: 'WiFi & Internet', value: 'WIFI_INTERNET' },
            { label: 'Cleaning & Housekeeping', value: 'CLEANING' },
            { label: 'Carpentry', value: 'CARPENTRY' },
            { label: 'Other', value: 'OTHER' },
          ]}
        />
        <Select
          label="Priority"
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value as ComplaintPriority })
          }
          options={[
            { label: 'Low', value: 'LOW' },
            { label: 'Medium', value: 'MEDIUM' },
            { label: 'High', value: 'HIGH' },
            { label: 'Urgent', value: 'URGENT' },
          ]}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Log Issue</Button>
      </div>
    </form>
  );
};
