'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PASSWORD_MIN,
  PASSWORD_MAX,
  USER_NAME_MIN,
  USER_NAME_MAX,
} from '@purly/shared';
import * as z from 'zod';
import {
  Form,
  FormTextControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/form';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';
import { Recaptcha } from '../../../components/recaptcha';
import { useRecaptcha } from '../../../hooks/useRecaptcha';
import { useRegister } from '../../../hooks/queries/useAuth';
import { formatError } from '../../../lib/utils';

export const registerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(USER_NAME_MIN).max(USER_NAME_MAX),
  password: z.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
});
type RegisterSchema = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const recaptcha = useRecaptcha();
  const { isLoading, mutate, isError, error, isSuccess } = useRegister();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
    },
  });

  const handleSubmit = async (data: RegisterSchema) => {
    const token = await recaptcha.getToken();
    if (!token) {
      return;
    }

    mutate(
      {
        ...data,
        recaptcha: token,
      },
      {
        onSuccess: () => router.push('/app'),
      }
    );
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2.5"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <span className="text-sm text-destructive">
          {isError && formatError(error)}
        </span>

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormTextControl>
                <Input placeholder="mail@example.com" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormTextControl>
                <Input placeholder="John Doe" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormTextControl>
                <Input type="password" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Recaptcha recaptcha={recaptcha} />
        <Button
          disabled={isLoading || isSuccess || !form.formState.isDirty}
          type="submit"
          className="w-full"
        >
          {isLoading ? 'Sending...' : 'Sign Up'}
        </Button>

        <span className="text-gray-400 pt-6 text-xs text-center">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            className="text-blue-400 hover:underline"
            href="https://policies.google.com/privacy"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            className="text-blue-400 hover:underline"
            href="https://policies.google.com/terms"
          >
            Terms of Service
          </a>{' '}
          apply.
        </span>
      </form>
    </Form>
  );
};
