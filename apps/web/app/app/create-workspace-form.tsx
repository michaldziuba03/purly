'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WORKSPACE_NAME_MAX } from '@purly/shared';
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
import { useWorkspaceRouter } from '../../hooks/useWorkspaceRouter';
import { useCreateWorkspace } from '../../hooks/queries/useWorkspace';
import { formatError } from '../../lib/utils';

interface ICreateWorkspaceFormProsps {
  onSuccess?: () => void;
}

export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(WORKSPACE_NAME_MAX),
  slug: z.string().min(1).max(WORKSPACE_NAME_MAX),
});
type CreateWorkspaceSchema = z.infer<typeof createWorkspaceSchema>;

export const CreateWorkspaceForm: React.FC<ICreateWorkspaceFormProsps> = ({
  onSuccess,
}) => {
  const { redirectTo } = useWorkspaceRouter();
  const { mutateAsync, isLoading, isError, error } = useCreateWorkspace();
  const form = useForm<CreateWorkspaceSchema>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const handleSubmit = async (data: CreateWorkspaceSchema) => {
    const result = await mutateAsync(data);
    // TODO: handle errors properly
    if (!result) return;
    redirectTo(result);

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {isError && (
          <span className="text-sm text-destructive">{formatError(error)}</span>
        )}

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

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Sending...' : 'Create workspace'}
        </Button>
      </form>
    </Form>
  );
};
