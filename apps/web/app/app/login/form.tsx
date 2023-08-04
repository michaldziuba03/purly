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

// TODO: export length constants in @purly/shared
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(USER_NAME_MIN).max(USER_NAME_MAX),
});
type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (data: LoginSchema) => {
    console.log(data);
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

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};
