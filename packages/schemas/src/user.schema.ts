import { z } from 'zod';

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100),
  email: z.string().email(),
  createdAt: z.date(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;
