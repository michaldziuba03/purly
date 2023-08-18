'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WORKSPACE_NAME_MAX } from '@purly/shared';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import {
  Form,
  FormTextControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { useSubmit } from '../../hooks/useSubmit';
import * as api from '../../lib/api';
import { useWorkspace } from './workspace';

export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(WORKSPACE_NAME_MAX),
  slug: z.string().min(1).max(WORKSPACE_NAME_MAX),
});
type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const CreateWorkspaceForm: React.FC = () => {
  const { setWorkspaces } = useWorkspace();
  const router = useRouter();
  const { submit, isSending, error } = useSubmit(api.createWorkspace);
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const handleSubmit = async (data: CreateWorkspaceSchema) => {
    const result = await submit(data);
    setWorkspaces((workspaces: object[]) => [result.data, ...workspaces]);
    console.log(result);
    router.push(`/app/${result.slug}`);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <span className="text-sm text-destructive">
          {error?.response?.data.message}
        </span>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormTextControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="slug"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pathname</FormLabel>
              <FormTextControl>
                <Input placeholder="acme" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isSending} type="submit" className="w-full">
          {isSending ? 'Sending...' : 'Create workspace'}
        </Button>
      </form>
    </Form>
  );
};
