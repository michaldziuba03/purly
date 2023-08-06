'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { USER_NAME_MIN, USER_NAME_MAX } from '@purly/shared';
import Link from 'next/link';
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

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(USER_NAME_MIN).max(USER_NAME_MAX),
});
type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const recaptcha = useRecaptcha();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginSchema) => {
    const token = await recaptcha.getToken();
    console.log({
      ...data,
      recaptcha: token,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
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
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormTextControl>
                <Input type="password" {...field} />
              </FormTextControl>
              <FormMessage />
              <Link
                className="text-xs space-y-2 hover:underline text-gray-700"
                href="/app/reset"
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />

        <Recaptcha recaptcha={recaptcha} />
        <Button type="submit" className="w-full">
          Sign In
        </Button>

        <span className="text-gray-400 py-6 text-xs text-center">
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
