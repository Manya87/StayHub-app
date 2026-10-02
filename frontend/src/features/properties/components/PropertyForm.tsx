import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreatePropertyDTO } from '../types/property.types';

interface PropertyFormProps {
  onSubmit: (data: CreatePropertyDTO) => void;
  onCancel: () => void;
  initialValues?: Partial<CreatePropertyDTO>;
  isLoading?: boolean;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isLoading,
}) => {
  const [formData, setFormData] = useState<CreatePropertyDTO>({
    name: initialValues?.name || '',
    code: initialValues?.code || '',
    address: initialValues?.address || '',
    city: initialValues?.city || 'Bengaluru',
    state: initialValues?.state || 'Karnataka',
    pincode: initialValues?.pincode || '',
    contactNumber: initialValues?.contactNumber || '',
    status: initialValues?.status || 'ACTIVE',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Property Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. StayHub Skyline"
          required
        />
        <Input
          label="Property Code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="e.g. SH-SK-05"
          required
        />
      </div>

      <Input
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Street address, locality"
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Bengaluru"
          required
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Karnataka"
          required
        />
        <Input
          label="Pincode"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="560001"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          placeholder="+91 98765 00000"
          required
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Under Maintenance', value: 'MAINTENANCE' },
            { label: 'Inactive', value: 'INACTIVE' },
          ]}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          Save Property
        </Button>
      </div>
    </form>
  );
};
