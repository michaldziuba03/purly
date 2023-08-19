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
} from '../../../../components/form';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { useCreateLink } from '../../../../hooks/queries/useLinks';
import { copyToClipboard } from '../../../../lib/clipboard';
import { useToast } from '../../../../hooks/useToast';

interface CreateLinkFormProps {
  closeDialog?: (open: boolean) => any;
}

export const createLinkSchema = z.object({
  url: z.string().min(1).url(),
  name: z.string().min(1).max(WORKSPACE_NAME_MAX),
});
type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export const CreateLinkForm: React.FC<CreateLinkFormProps> = (props) => {
  const form = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  });

  const { error, isLoading, mutateAsync } = useCreateLink();
  const { toast } = useToast();

  async function handleSubmit(data: CreateLinkSchema) {
    const result = await mutateAsync(data);
    if (props.closeDialog) {
      props.closeDialog(false);
    }
    const shortlink = `http://localhost:4200/${(result as any).alias}`;
    await copyToClipboard(shortlink);
    toast({ title: 'Copied created link to clipboard.' });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <FormTextControl>
                <Input {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormTextControl>
                <Input {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} type="submit" className="w-full">
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Form>
  );
};
