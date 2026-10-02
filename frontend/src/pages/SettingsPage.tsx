import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useUiStore } from '@/store/uiStore';

export const SettingsPage: React.FC = () => {
  const { addToast } = useUiStore();
  const [activeTab, setActiveTab] = useState<
    'general' | 'payments' | 'notifications' | 'food' | 'users' | 'backup'
  >('general');

  const [pgName, setPgName] = useState('Sunrise PG');
  const [address, setAddress] = useState('123, Green Park, Bangalore');
  const [phone, setPhone] = useState('9876543210');
  const [email, setEmail] = useState('info@sunrisepg.com');
  const [currency, setCurrency] = useState('INR');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Settings updated successfully!');
  };

  return (
    <PageContainer
      title="Settings"
      subtitle="Manage your PG preferences"
    >
      <Card className="p-0 bg-white border border-[#eef1f6] overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left inner navigation (Screen 15) */}
          <div className="md:w-60 border-b md:border-b-0 md:border-r border-slate-100 p-3 space-y-1 bg-slate-50/50">
            {[
              { id: 'general', label: 'General' },
              { id: 'payments', label: 'Payment Settings' },
              { id: 'notifications', label: 'Notification Settings' },
              { id: 'food', label: 'Food Menu Settings' },
              { id: 'users', label: 'User Management' },
              { id: 'backup', label: 'Backup & Data' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#5d5fef] text-white shadow-sm shadow-[#5d5fef]/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right form area */}
          <div className="flex-1 p-6 md:p-8">
            <h3 className="text-base font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
              General Settings
            </h3>

            <form onSubmit={handleSave} className="space-y-4 max-w-lg">
              <Input
                label="PG Name"
                value={pgName}
                onChange={(e) => setPgName(e.target.value)}
                placeholder="e.g. Sunrise PG"
                required
              />
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete PG address"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter contact phone"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter contact email"
                  required
                />
              </div>
              <Select
                label="Currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                options={[
                  { label: 'Indian Rupee (INR - ₹)', value: 'INR' },
                  { label: 'US Dollar (USD - $)', value: 'USD' },
                ]}
              />

              <div className="pt-6 flex justify-end">
                <Button
                  type="submit"
                  className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white px-6 font-semibold shadow-md shadow-[#5d5fef]/20 rounded-xl"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};
