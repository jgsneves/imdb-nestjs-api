import { UserRole } from '@prisma/client';
import { createUserValidationMessages } from 'src/constants/validation-request-body-messages';
import { z } from 'zod';

export const createUserSchema = z
  .object({
    email: z.string().email({ message: createUserValidationMessages.email }),
    name: z.string({ required_error: createUserValidationMessages.name }),
    role: z.nativeEnum(UserRole),
    password: z.string().min(12, createUserValidationMessages.passwordLenght),
    confirmPassword: z
      .string()
      .min(12, createUserValidationMessages.passwordLenght),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: createUserValidationMessages.passwordDoesntMatch,
    path: ['confirmPassword'],
  });

export type CreateUserDto = z.infer<typeof createUserSchema>;
