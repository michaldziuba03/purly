import { z } from "zod";
 
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const USERNAME_MAX_LENGTH = 64;

export const RegisterSchema = z.object({
  username: z.string().min(1).max(USERNAME_MAX_LENGTH),
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const ResetPasswordRequestSchema = z.object({
  email: z.email(),
});

export type ResetPasswordRequestDto = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH),
});
export type ResetPasswordDto = z.infer<typeof ResetPasswordSchema>;
