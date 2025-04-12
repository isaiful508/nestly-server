import { z } from 'zod';

// Create Rental House Validation Schema
export const createRentalHouseValidationSchema = z.object({
  body: z.object({
   
    description: z.string().min(10, 'Description must be at least 10 characters'),
    rentAmount: z.number().min(0, 'Rent amount must be a positive number'),
    bedrooms: z.number().min(1, 'There must be at least 1 bedroom'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    available: z.boolean().optional(),
  }),
});

// Update Rental House Validation Schema
export const updateRentalHouseValidationSchema = z.object({
 
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  rentAmount: z.number().min(0, 'Rent amount must be a positive number').optional(),
  bedrooms: z.number().min(1, 'There must be at least 1 bedroom').optional(),
  images: z.array(z.string()).min(1, 'At least one image is required').optional(),
  available: z.boolean().optional(),
});
