import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Property } from '../types/property.types';
import { Building2, MapPin, Phone, Calendar, Bed, DoorClosed } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

interface PropertyDetailsProps {
  property: Property;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white border border-[#eef1f6]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-50 text-[#5d5fef]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{property.name}</h3>
              <p className="text-xs font-mono font-semibold text-slate-500 mt-0.5">{property.code}</p>
            </div>
          </div>
          <Badge variant={property.status === 'ACTIVE' ? 'success' : 'warning'}>
            {property.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 text-xs">
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-800">{property.address}, {property.city}, {property.state} - {property.pincode}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-800">{property.contactNumber}</span>
            </div>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5 text-slate-700">
              <DoorClosed className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700">Total Rooms: <strong className="text-slate-900 font-bold">{property.totalRooms}</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Bed className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700">
                Total Beds: <strong className="text-slate-900 font-bold">{property.totalBeds}</strong> ({property.occupiedBeds} occupied)
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="font-medium text-slate-700">Created on: <strong className="text-slate-900 font-bold">{formatDate(property.createdAt)}</strong></span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
