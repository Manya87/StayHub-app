export type StaffRole =
  | 'PROPERTY_MANAGER'
  | 'WARDEN'
  | 'CARETAKER'
  | 'SECURITY_GUARD'
  | 'HEAD_CHEF'
  | 'HOUSEKEEPING'
  | 'ELECTRICIAN'
  | 'PLUMBER';

export interface StaffRecord {
  id: string;
  propertyId: string;
  propertyName?: string;
  name: string;
  role: StaffRole;
  phone: string;
  salary: number;
  shift: 'DAY' | 'NIGHT' | 'ROTATIONAL';
  joiningDate: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'RESIGNED';
}

export interface CreateStaffDTO {
  propertyId: string;
  name: string;
  role: StaffRole;
  phone: string;
  salary: number;
  shift: string;
}
