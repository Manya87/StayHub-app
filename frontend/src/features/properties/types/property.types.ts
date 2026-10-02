export interface Property {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  imageUrl?: string;
  createdAt: string;
}

export interface CreatePropertyDTO {
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  status?: string;
  imageUrl?: string;
}
