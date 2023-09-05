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
import { useForgotPassword } from '../../../hooks/queries/useAuth';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';
import { CheckCircle } from 'lucide-react';

export const resetRequestSchema = z.object({
  email: z.string().email(),
});
type ResetRequestSchema = z.infer<typeof resetRequestSchema>;

export const ResetRequestForm: React.FC = () => {
  const recaptcha = useRecaptcha();
  const { isLoading, isSuccess, error, mutate } = useForgotPassword();

  const form = useForm<ResetRequestSchema>({
    resolver: zodResolver(resetRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data: ResetRequestSchema) => {
    const token = await recaptcha.getToken();
    if (!token) {
      return;
    }

    mutate({
      ...data,
      recaptcha: token,
    });
  };

  if (isSuccess) {
    return (
      <CardHeader className="space-y-1 p-0">
        <CheckCircle className="w-8 h-8 mb-2 text-green-700" />
        <CardTitle className="text-2xl">Email sent</CardTitle>
        <CardDescription>
          Check your email and open the link we sent to continue.
        </CardDescription>
      </CardHeader>
    );
  }

  return (
    <>
      <CardHeader className="space-y-1 p-0">
        <CardTitle className="text-2xl">Forgot your password?</CardTitle>
        <CardDescription>
          Enter your email and we will send you instructions on how to reset
          your password.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 mt-4">
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
            <Button
              disabled={isLoading || !form.formState.isDirty}
              type="submit"
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send instructions'}
            </Button>

            <span className="text-sm text-muted-foreground">
              Go back to{' '}
              <Link href="/auth/login" className="underline">
                Login page
              </Link>
            </span>

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
      </CardContent>
    </>
  );
};
