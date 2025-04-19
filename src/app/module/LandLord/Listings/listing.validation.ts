import { z } from 'zod';

// Create Rental House Validation Schema
export const createRentalHouseValidationSchema = z.object({
  body: z.object({
    description: z.string().min(10, 'Description must be at least 10 characters'),
    rentAmount: z.string().min(0, 'Rent amount must be a positive number'),
    bedrooms: z.string().min(1, 'There must be at least 1 bedroom'),
    images: z.array(z.string()).min(1, 'At least one image is required'),
  }),
});

// Update Rental House Validation Schema
export const updateRentalHouseValidationSchema = z.object({
 
  description: z.string().min(10, 'Description must be at least 10 characters').optional(),
  rentAmount: z.string().min(0, 'Rent amount must be a positive number').optional(),
  bedrooms: z.string().min(1, 'There must be at least 1 bedroom').optional(),
  images: z.array(z.string()).min(1, 'At least one image is required').optional(),
});
