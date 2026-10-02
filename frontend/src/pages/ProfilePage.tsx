import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/store/authStore';
import { useUiStore } from '@/store/uiStore';
import { User, Lock, LogOut } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { addToast } = useUiStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const [fullName, setFullName] = useState('Admin Kumar');
  const [email, setEmail] = useState('admin@pghub.com');
  const [phone, setPhone] = useState('9876543210');
  const [role] = useState('Owner');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('success', 'Profile updated successfully!');
  };

  return (
    <PageContainer
      title="My Profile"
      subtitle="Manage your account details"
    >
      <Card className="p-0 bg-white border border-[#eef1f6] overflow-hidden max-w-4xl">
        <div className="flex flex-col md:flex-row min-h-[460px]">
          {/* Left Navigation inside Profile (Screen 16) */}
          <div className="md:w-56 border-b md:border-b-0 md:border-r border-slate-100 p-3 space-y-1 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#5d5fef] text-white shadow-sm shadow-[#5d5fef]/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'password'
                  ? 'bg-[#5d5fef] text-white shadow-sm shadow-[#5d5fef]/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 md:p-8">
            {activeTab === 'profile' ? (
              <form onSubmit={handleUpdate} className="h-full flex flex-col justify-between">
                <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-8">
                  {/* Left inputs */}
                  <div className="flex-1 w-full space-y-4 max-w-sm">
                    <Input
                      label="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Input
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <Input
                      label="Role"
                      value={role}
                      disabled
                      className="bg-slate-100 text-slate-500 cursor-not-allowed capitalize"
                    />
                  </div>

                  {/* Right photo */}
                  <div className="flex flex-col items-center gap-2 sm:pr-8">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80"
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-indigo-50 shadow-sm"
                    />
                    <button
                      type="button"
                      className="text-xs text-[#5d5fef] font-semibold hover:underline"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Bottom right submit button */}
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white px-6 font-semibold shadow-md shadow-[#5d5fef]/20 rounded-xl"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addToast('success', 'Password updated successfully!');
                }}
                className="space-y-4 max-w-md"
              >
                <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                  Change Password
                </h4>
                <Input label="Current Password" type="password" required />
                <Input label="New Password" type="password" required />
                <Input label="Confirm New Password" type="password" required />
                <div className="pt-2">
                  <Button type="submit" className="bg-[#5d5fef] text-white">
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};
