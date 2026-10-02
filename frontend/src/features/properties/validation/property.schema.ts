import { z } from 'zod';

export const propertySchema = z.object({
  name: z.string().min(3, 'Property name must be at least 3 characters'),
  code: z.string().min(2, 'Code must be at least 2 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().min(6, 'Pincode must be 6 digits'),
  contactNumber: z.string().min(10, 'Contact number is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']).default('ACTIVE'),
});

export type PropertyFormData = z.infer<typeof propertySchema>;
