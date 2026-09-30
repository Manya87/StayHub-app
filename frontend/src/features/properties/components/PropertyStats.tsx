import React from 'react';
import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { Property } from '../types/property.types';
import { Bed, Users, ShieldCheck, DollarSign } from 'lucide-react';

interface PropertyStatsProps {
  property: Property;
}

export const PropertyStats: React.FC<PropertyStatsProps> = ({ property }) => {
  const occupancyRate =
    property.totalBeds > 0
      ? Math.round((property.occupiedBeds / property.totalBeds) * 100)
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Capacity"
        value={`${property.totalBeds} Beds`}
        icon={<Bed className="w-5 h-5" />}
        description={`Across ${property.totalRooms} rooms`}
      />
      <StatsCard
        title="Occupancy Rate"
        value={`${occupancyRate}%`}
        isPositive={occupancyRate > 75}
        change={`${property.occupiedBeds} Filled`}
        icon={<Users className="w-5 h-5" />}
      />
      <StatsCard
        title="Available Vacancies"
        value={`${property.totalBeds - property.occupiedBeds} Beds`}
        icon={<ShieldCheck className="w-5 h-5" />}
        description="Ready for booking"
      />
      <StatsCard
        title="Estimated Yield"
        value="₹ 2.4L"
        icon={<DollarSign className="w-5 h-5" />}
        description="Monthly standard rent"
      />
    </div>
  );
};
