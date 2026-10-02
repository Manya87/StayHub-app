import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Property } from '../types/property.types';
import { Building2, MapPin, Bed, Phone } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const occupancyPercent =
    property.totalBeds > 0
      ? Math.round((property.occupiedBeds / property.totalBeds) * 100)
      : 0;

  return (
    <Card hoverEffect className="cursor-pointer group p-5 bg-white border border-[#eef1f6]" onClick={() => onSelect?.(property)}>
      <div className="flex items-start justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 text-[#5d5fef] group-hover:bg-[#5d5fef] group-hover:text-white transition-all">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#5d5fef] transition-colors">
              {property.name}
            </h4>
            <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
              {property.code}
            </span>
          </div>
        </div>
        <Badge variant={property.status === 'ACTIVE' ? 'success' : 'warning'} size="sm">
          {property.status}
        </Badge>
      </div>

      <div className="py-3 space-y-2 text-xs text-slate-600 font-medium">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">{property.address}, {property.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          <span>{property.contactNumber}</span>
        </div>
      </div>

      {/* Capacity meter */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Bed className="w-3.5 h-3.5 text-[#5d5fef]" />
            Beds: {property.occupiedBeds}/{property.totalBeds}
          </span>
          <span className="font-bold text-emerald-600">{occupancyPercent}% Occupied</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#5d5fef] h-full rounded-full transition-all duration-300"
            style={{ width: `${occupancyPercent}%` }}
          />
        </div>
      </div>
    </Card>
  );
};
