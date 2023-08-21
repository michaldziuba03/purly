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
  optionalField,
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
  url: z.string().url(),
  name: z.string().min(1).max(WORKSPACE_NAME_MAX).optional(),
  androidRedirect: z.string().url().optional(),
  iosRedirect: z.string().url().optional(),
});
type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export const CreateLinkForm: React.FC<CreateLinkFormProps> = (props) => {
  const form = useForm<CreateLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      url: '',
      name: undefined,
      androidRedirect: undefined,
      iosRedirect: undefined,
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
              <FormLabel>Destination URL</FormLabel>
              <FormTextControl>
                <Input placeholder="https://example.com/long-url" {...field} />
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
              <FormLabel>Name (Optional)</FormLabel>
              <FormTextControl>
                <Input {...optionalField(field)} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="androidRedirect"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Android targeting (Optional)</FormLabel>
              <FormTextControl>
                <Input
                  placeholder="https://play.google.com/store/apps/details?id=xxx"
                  {...optionalField(field)}
                />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="iosRedirect"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>IOS targeting (Optional)</FormLabel>
              <FormTextControl>
                <Input
                  placeholder="https://apps.apple.com/app/xxx"
                  {...optionalField(field)}
                />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full mt-4 flex gap-4 justify-end">
          <Button type="button" variant="secondary">
            Close
          </Button>
          <Button disabled={isLoading} type="submit">
            {isLoading ? 'Creating...' : 'Create link'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
