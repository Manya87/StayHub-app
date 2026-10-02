import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreateRoomDTO, RoomType } from '../types/room.types';
import { useProperties } from '@/features/properties/hooks/useProperties';

interface RoomFormProps {
  onSubmit: (data: CreateRoomDTO) => void;
  onCancel: () => void;
}

export const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, onCancel }) => {
  const { properties } = useProperties();
  const [formData, setFormData] = useState<CreateRoomDTO>({
    propertyId: properties[0]?.id || '',
    roomNumber: '',
    floor: 1,
    type: 'DOUBLE',
    capacity: 2,
    baseRent: 8000,
    hasAttachedBathroom: true,
    hasBalcony: false,
    hasAc: false,
  });

  const propertyOptions = properties.map((p) => ({ label: p.name, value: p.id }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Property"
        value={formData.propertyId}
        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
        options={propertyOptions}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Room Number / Name"
          value={formData.roomNumber}
          onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
          placeholder="e.g. 101"
          required
        />
        <Input
          label="Floor"
          type="number"
          value={formData.floor}
          onChange={(e) => setFormData({ ...formData, floor: Number(e.target.value) })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Room Type"
          value={formData.type}
          onChange={(e) => {
            const type = e.target.value as RoomType;
            let capacity = 2;
            if (type === 'SINGLE') capacity = 1;
            if (type === 'DOUBLE') capacity = 2;
            if (type === 'TRIPLE') capacity = 3;
            if (type === 'FOUR_SHARING') capacity = 4;
            if (type === 'DORMITORY') capacity = 6;
            setFormData({ ...formData, type, capacity });
          }}
          options={[
            { label: 'Single Room (1 Bed)', value: 'SINGLE' },
            { label: 'Double Sharing (2 Beds)', value: 'DOUBLE' },
            { label: 'Triple Sharing (3 Beds)', value: 'TRIPLE' },
            { label: 'Four Sharing (4 Beds)', value: 'FOUR_SHARING' },
            { label: 'Dormitory (6 Beds)', value: 'DORMITORY' },
          ]}
        />
        <Input
          label="Rent per Bed (₹)"
          type="number"
          value={formData.baseRent}
          onChange={(e) => setFormData({ ...formData, baseRent: Number(e.target.value) })}
          required
        />
      </div>

      <div className="pt-2 space-y-2 border-t border-slate-800">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Amenities
        </label>
        <div className="grid grid-cols-3 gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasAttachedBathroom}
              onChange={(e) => setFormData({ ...formData, hasAttachedBathroom: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Attached Bath</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasAc}
              onChange={(e) => setFormData({ ...formData, hasAc: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Air Conditioning</span>
          </label>
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasBalcony}
              onChange={(e) => setFormData({ ...formData, hasBalcony: e.target.checked })}
              className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
            />
            <span>Balcony</span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Room</Button>
      </div>
    </form>
  );
};
