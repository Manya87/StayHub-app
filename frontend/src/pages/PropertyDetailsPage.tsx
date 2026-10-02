import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/layout/PageContainer';
import { PropertyDetails } from '@/features/properties/components/PropertyDetails';
import { PropertyStats } from '@/features/properties/components/PropertyStats';
import { RoomTable } from '@/features/rooms/components/RoomTable';
import { useProperties } from '@/features/properties/hooks/useProperties';
import { useRooms } from '@/features/rooms/hooks/useRooms';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties } = useProperties();
  const { rooms } = useRooms();

  const property = properties.find((p) => p.id === id) || properties[0];

  if (!property) {
    return (
      <PageContainer title="Property Not Found">
        <p className="text-slate-400">The requested property was not found.</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={property.name}
      subtitle={`Property Code: ${property.code} • ${property.city}`}
      actions={
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/properties')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Properties
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/rooms')}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Room to Property
          </Button>
        </div>
      }
    >
      <PropertyStats property={property} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PropertyDetails property={property} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">Rooms in this Property</h4>
            <span className="text-xs text-slate-400">{rooms.length} configured rooms</span>
          </div>
          <RoomTable rooms={rooms} />
        </div>
      </div>
    </PageContainer>
  );
};
