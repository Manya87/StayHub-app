import { z } from 'zod';

export const roomSchema = z.object({
  propertyId: z.string().min(1, 'Please select a property'),
  roomNumber: z.string().min(1, 'Room number is required'),
  floor: z.number().min(0, 'Floor must be 0 or higher'),
  type: z.enum(['SINGLE', 'DOUBLE', 'TRIPLE', 'FOUR_SHARING', 'DORMITORY']),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  baseRent: z.number().min(1000, 'Rent must be positive'),
  hasAttachedBathroom: z.boolean().default(false),
  hasBalcony: z.boolean().default(false),
  hasAc: z.boolean().default(false),
});

export type RoomFormData = z.infer<typeof roomSchema>;
