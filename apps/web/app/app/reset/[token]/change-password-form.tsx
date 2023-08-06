'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { Recaptcha } from '../../../../components/recaptcha';
import { useRecaptcha } from '../../../../hooks/useRecaptcha';
import {
  Form,
  FormTextControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../components/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PASSWORD_MAX, PASSWORD_MIN } from '@purly/shared';

export const changePasswordSchema = z
  .object({
    password: z.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
    confirmPassword: z.string().min(PASSWORD_MIN).max(PASSWORD_MAX),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const ChangePasswordForm: React.FC = () => {
  const recaptcha = useRecaptcha();
  const params = useParams();

  const form = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: ChangePasswordSchema) => {
    const recaptchaToken = await recaptcha.getToken();
    console.log({
      ...data,
      recaptcha: recaptchaToken,
      token: params.token,
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
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

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormTextControl>
                <Input type="password" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Recaptcha recaptcha={recaptcha} />
        <Button type="submit" className="w-full">
          Change password
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
