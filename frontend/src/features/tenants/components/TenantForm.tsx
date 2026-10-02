import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { CreateTenantDTO } from '../types/tenant.types';
import { useProperties } from '@/features/properties/hooks/useProperties';
import { useRooms } from '@/features/rooms/hooks/useRooms';
import { Camera, Check } from 'lucide-react';

interface TenantFormProps {
  onSubmit: (data: CreateTenantDTO) => void;
  onCancel: () => void;
}

export const TenantForm: React.FC<TenantFormProps> = ({ onSubmit, onCancel }) => {
  const { properties } = useProperties();
  const { rooms } = useRooms();

  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [isActive, setIsActive] = useState(true);

  const [formData, setFormData] = useState<CreateTenantDTO>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: '',
    propertyId: properties[0]?.id || '',
    roomId: rooms[0]?.id || '',
    bedId: 'b1',
    monthlyRent: 8500,
    securityDeposit: 17000,
    checkInDate: new Date().toISOString().split('T')[0],
    idProofType: 'Aadhaar Card',
    idProofNumber: '',
  });

  const [relation, setRelation] = useState('Parent');

  const roomOptions = rooms.length > 0
    ? rooms.map((r) => ({ label: `Room ${r.roomNumber} (${r.type})`, value: r.id }))
    : [
        { label: 'Room 101 (Double)', value: 'r1' },
        { label: 'Room 102 (Single)', value: 'r2' },
        { label: 'Room 201 (Double)', value: 'r3' },
        { label: 'Room 202 (Triple)', value: 'r4' },
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-4">
      {/* 1. Personal Information */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Personal Information
        </h4>

        {/* Full Name & Photo Upload */}
        <div className="flex items-start gap-4">
          <div className="flex-1 space-y-4">
            <Input
              label="Full Name *"
              value={`${formData.firstName} ${formData.lastName}`.trim()}
              onChange={(e) => {
                const parts = e.target.value.split(' ');
                setFormData({
                  ...formData,
                  firstName: parts[0] || '',
                  lastName: parts.slice(1).join(' ') || '',
                });
              }}
              placeholder="Enter full name"
              required
            />

            {/* Gender Selection */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">Gender *</label>
              <div className="flex items-center gap-2">
                {(['Male', 'Female', 'Other'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      gender === g
                        ? 'bg-[#5d5fef] text-white border-[#5d5fef] shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo circle uploader */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 hover:border-[#5d5fef] bg-slate-50 flex flex-col items-center justify-center cursor-pointer transition-colors text-slate-400 hover:text-[#5d5fef]">
              <Camera className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium">Upload</span>
            </div>
          </div>
        </div>

        {/* DOB & Phone */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Date of Birth"
            type="date"
            placeholder="dd-mm-yyyy"
          />
          <Input
            label="Phone Number *"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Email & Aadhaar */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email (optional)"
          />
          <Input
            label="Aadhaar / ID Proof No."
            value={formData.idProofNumber}
            onChange={(e) => setFormData({ ...formData, idProofNumber: e.target.value })}
            placeholder="Enter ID number"
          />
        </div>
      </div>

      {/* 2. Stay Details */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Stay Details
        </h4>

        <div className="grid grid-cols-3 gap-3">
          <Select
            label="Room No. *"
            value={formData.roomId}
            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
            options={roomOptions}
            placeholder="Select room"
            required
          />
          <Input
            label="Joining Date *"
            type="date"
            value={formData.checkInDate}
            onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
            required
          />
          <Select
            label="Duration"
            options={[
              { label: '3 Months', value: '3m' },
              { label: '6 Months', value: '6m' },
              { label: '11 Months', value: '11m' },
            ]}
            placeholder="Select duration"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Rent Amount (₹) *"
            type="number"
            value={formData.monthlyRent}
            onChange={(e) => setFormData({ ...formData, monthlyRent: Number(e.target.value) })}
            required
          />
          <Input
            label="Deposit Amount (₹)"
            type="number"
            value={formData.securityDeposit}
            onChange={(e) => setFormData({ ...formData, securityDeposit: Number(e.target.value) })}
          />
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">Status</label>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              {isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Emergency Contact */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Emergency Contact
        </h4>

        <div className="grid grid-cols-3 gap-3">
          <Input
            label="Contact Name *"
            placeholder="Enter name"
            required
          />
          <Input
            label="Phone Number *"
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            placeholder="Enter phone number"
            required
          />
          <Select
            label="Relation *"
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            options={[
              { label: 'Parent', value: 'Parent' },
              { label: 'Sibling', value: 'Sibling' },
              { label: 'Guardian', value: 'Guardian' },
              { label: 'Friend', value: 'Friend' },
            ]}
          />
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-5">
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white px-6 font-semibold shadow-md shadow-[#5d5fef]/20"
        >
          Save Tenant
        </Button>
      </div>
    </form>
  );
};
