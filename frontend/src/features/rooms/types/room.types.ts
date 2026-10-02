export type RoomType = 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'FOUR_SHARING' | 'DORMITORY';
export type BedState = 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';

export interface Bed {
  id: string;
  roomId?: string;
  bedNumber: string;
  status: BedState;
  monthlyRent: number;
  tenantId?: string;
  tenantName?: string;
}

export interface Room {
  id: string;
  propertyId: string;
  propertyName?: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  capacity: number;
  hasAttachedBathroom: boolean;
  hasBalcony: boolean;
  hasAc: boolean;
  baseRent: number;
  beds: Bed[];
  status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
}

export interface CreateRoomDTO {
  propertyId: string;
  roomNumber: string;
  floor: number;
  type: RoomType;
  capacity: number;
  baseRent: number;
  hasAttachedBathroom: boolean;
  hasBalcony: boolean;
  hasAc: boolean;
}
