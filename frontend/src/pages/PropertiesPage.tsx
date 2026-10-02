import React, { useState } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { PropertyCard } from '@/features/properties/components/PropertyCard';
import { PropertyTable } from '@/features/properties/components/PropertyTable';
import { PropertyForm } from '@/features/properties/components/PropertyForm';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/common/SearchBar';
import { useProperties } from '@/features/properties/hooks/useProperties';
import { useModal } from '@/hooks/useModal';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PropertiesPage: React.FC = () => {
  const { properties, loading, createProperty } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const modal = useModal();
  const navigate = useNavigate();

  const filtered = properties.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer
      title="Properties & Hostels"
      subtitle="Manage your building locations, capacity, and infrastructure"
      actions={
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button size="sm" onClick={modal.open} leftIcon={<Plus className="w-4 h-4" />}>
            Add Property
          </Button>
        </div>
      }
    >
      <div className="flex items-center justify-between gap-4 pb-2">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by property name, code, or city..."
          className="max-w-md w-full"
        />
        <span className="text-xs text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> properties
        </span>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onSelect={(p) => navigate(`/properties/${p.id}`)}
            />
          ))}
        </div>
      ) : (
        <PropertyTable properties={filtered} isLoading={loading} />
      )}

      {/* Add Property Modal */}
      <Modal isOpen={modal.isOpen} onClose={modal.close} title="Register New Property" maxWidth="lg">
        <PropertyForm
          onSubmit={async (data) => {
            await createProperty(data);
            modal.close();
          }}
          onCancel={modal.close}
        />
      </Modal>
    </PageContainer>
  );
};
