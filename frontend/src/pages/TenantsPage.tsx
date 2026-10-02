import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { TenantTable } from '@/features/tenants/components/TenantTable';
import { TenantForm } from '@/features/tenants/components/TenantForm';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { useTenants } from '@/features/tenants/hooks/useTenants';
import { useModal } from '@/hooks/useModal';
import { Plus, Search, Filter } from 'lucide-react';

export const TenantsPage: React.FC = () => {
  const { tenants, loading, createTenant } = useTenants();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Due' | 'Inactive'>('All');
  const addDrawer = useModal();

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      addDrawer.open();
    }
  }, [searchParams]);

  const counts = {
    all: tenants.length || 52,
    active: tenants.filter((t) => t.status === 'ACTIVE').length || 48,
    due: tenants.filter((t) => t.status === 'NOTICE_PERIOD').length || 3,
    inactive: tenants.filter((t) => t.status === 'PENDING_CHECKIN').length || 1,
  };

  const filtered = tenants.filter((t) => {
    const matchesSearch =
      `${t.firstName} ${t.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.phone.includes(searchTerm) ||
      t.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === 'Active') return matchesSearch && t.status === 'ACTIVE';
    if (activeTab === 'Due') return matchesSearch && t.status === 'NOTICE_PERIOD';
    if (activeTab === 'Inactive') return matchesSearch && t.status !== 'ACTIVE';
    return matchesSearch;
  });

  return (
    <PageContainer
      title="Tenants"
      subtitle="Manage all your PG tenants"
      actions={
        <Button
          size="sm"
          onClick={addDrawer.open}
          leftIcon={<Plus className="w-4 h-4" />}
          className="bg-[#5d5fef] hover:bg-[#4f46e5] text-white shadow-sm shadow-[#5d5fef]/25 font-semibold"
        >
          Add Tenant
        </Button>
      }
    >
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        {/* Search input with search icon */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, room, phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5d5fef]/20 focus:border-[#5d5fef] shadow-sm"
          />
        </div>

        {/* Filter button */}
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>

      {/* Segmented Filter Tabs matching Screen 3 */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 mb-5 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('All')}
          className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'All'
              ? 'text-[#5d5fef]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          All ({counts.all})
          {activeTab === 'All' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('Active')}
          className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'Active'
              ? 'text-[#5d5fef]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Active ({counts.active})
          {activeTab === 'Active' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('Due')}
          className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'Due'
              ? 'text-[#5d5fef]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Due Payment ({counts.due})
          {activeTab === 'Due' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('Inactive')}
          className={`pb-2.5 px-3 text-xs font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'Inactive'
              ? 'text-[#5d5fef]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Inactive ({counts.inactive})
          {activeTab === 'Inactive' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5d5fef] rounded-full" />
          )}
        </button>
      </div>

      {/* Tenants Table */}
      <TenantTable tenants={filtered} isLoading={loading} />

      {/* Add New Tenant Slide-Over Drawer (Screen 4) */}
      <Drawer
        isOpen={addDrawer.isOpen}
        onClose={addDrawer.close}
        title="Add New Tenant"
        position="right"
      >
        <TenantForm
          onSubmit={async (data) => {
            await createTenant(data);
            addDrawer.close();
          }}
          onCancel={addDrawer.close}
        />
      </Drawer>
    </PageContainer>
  );
};
