export type ComplaintPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ComplaintState = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export interface ComplaintRecord {
  id: string;
  propertyId: string;
  propertyName?: string;
  tenantId: string;
  tenantName: string;
  roomNumber: string;
  title: string;
  description: string;
  category: 'PLUMBING' | 'ELECTRICAL' | 'CLEANING' | 'WIFI_INTERNET' | 'CARPENTRY' | 'OTHER';
  priority: ComplaintPriority;
  status: ComplaintState;
  createdAt: string;
  resolvedAt?: string;
  resolutionNotes?: string;
}

export interface CreateComplaintDTO {
  propertyId: string;
  tenantId: string;
  title: string;
  description: string;
  category: string;
  priority: ComplaintPriority;
}
