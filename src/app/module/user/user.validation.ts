  import { z } from 'zod';

export const registerValidationSchema = z
  .object({
    name: z.string({required_error: "Name is required"}).min(1, 'Name is required'),
    email: z.string({required_error: "Email is required"}).email('Invalid email'),
    phoneNumber: z.string({required_error: "Phone number is required"}).min(10, 'Phone number is required'),
    password: z.string({required_error: "Password is required"}).min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters')
      .optional(),
    role: z.enum(['landlord', 'tenant'], {
      errorMap: () => ({ message: 'Role must be landlord or tenant' }),
    }),
    address: z.string().optional(),
    city: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only check match if confirmPassword is provided
      if (data.confirmPassword !== undefined) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  );

  export const loginValidationSchema = z.object({
    email: z.string().email('Invalid email address').optional(),
    username: z.string().min(1, 'Username is required').optional(),
    password: z.string().min(1, 'Password is required'),
  }).refine(data => data.email || data.username, {
    message: 'Either email or username is required',
    path: ['email', 'username'],
  });