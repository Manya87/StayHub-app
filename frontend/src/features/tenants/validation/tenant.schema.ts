import { z } from 'zod';

export const tenantSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
  propertyId: z.string().min(1, 'Please select a property'),
  roomId: z.string().min(1, 'Please select a room'),
  bedId: z.string().min(1, 'Please select a bed'),
  monthlyRent: z.number().min(500, 'Rent must be positive'),
  securityDeposit: z.number().min(0, 'Security deposit must be >= 0'),
  checkInDate: z.string().min(1, 'Check-in date is required'),
});

export type TenantFormData = z.infer<typeof tenantSchema>;
