'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

export const resetRequestSchema = z.object({
  email: z.string().email(),
});
type ResetRequestSchema = z.infer<typeof resetRequestSchema>;

export const ResetRequestForm: React.FC = () => {
  const recaptcha = useRecaptcha();

  const form = useForm<ResetRequestSchema>({
    resolver: zodResolver(resetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ResetRequestSchema) => {
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

        <Recaptcha recaptcha={recaptcha} />
        <Button type="submit" className="w-full">
          Send instructions
        </Button>

        <span className="text-sm text-muted-foreground">
          Go back to{' '}
          <Link href="/app/login" className="underline">
            Login page
          </Link>
        </span>

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
