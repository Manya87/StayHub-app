export type TenantStatus = 'ACTIVE' | 'PENDING_CHECKIN' | 'NOTICE_PERIOD' | 'CHECKED_OUT';

export interface Tenant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  propertyId: string;
  propertyName?: string;
  roomId: string;
  roomNumber: string;
  bedId: string;
  bedNumber: string;
  monthlyRent: number;
  securityDeposit: number;
  checkInDate: string;
  checkOutDate?: string;
  status: TenantStatus;
  idProofType?: string;
  idProofNumber?: string;
  idProofUrl?: string;
}

export interface CreateTenantDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  emergencyContact: string;
  propertyId: string;
  roomId: string;
  bedId: string;
  monthlyRent: number;
  securityDeposit: number;
  checkInDate: string;
  idProofType?: string;
  idProofNumber?: string;
}
