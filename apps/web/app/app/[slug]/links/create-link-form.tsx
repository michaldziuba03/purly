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
import { MobileTargetingFields } from './create-link-form/mobile-targeting';
import { UtmBuilder } from './create-link-form/utm-builder';

interface CreateLinkFormProps {
  closeDialog?: (open: boolean) => any;
}

export const createLinkSchema = z.object({
  url: z.string().url(),
  name: z.string().min(1).max(WORKSPACE_NAME_MAX).optional(),
  androidRedirect: z.string().url().optional(),
  iosRedirect: z.string().url().optional(),
  enableUtm: z.boolean(),
  utm: z.object({
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
    utm_term: z.string().optional(),
    utm_content: z.string().optional(),
  }),
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
      utm: {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
      },
      enableUtm: false,
    },
  });

  const { error, isLoading, mutateAsync } = useCreateLink();
  const { toast } = useToast();

  async function handleSubmit(formData: CreateLinkSchema) {
    const { enableUtm, utm, ...data } = formData;

    if (enableUtm) {
      const urlObj = new URL(data.url);

      for (const param in utm) {
        type UTMParam = keyof typeof utm;
        const value = utm[param as UTMParam];
        if (value) {
          urlObj.searchParams.set(param, value);
        }
      }

      data.url = urlObj.toString();
    }

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
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="max-h-[400px] w-full overflow-y-auto no-scrollbar p-2 flex flex-col gap-4">
          <FormField
            name="url"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination URL</FormLabel>
                <FormTextControl>
                  <Input
                    placeholder="https://example.com/long-url"
                    {...field}
                  />
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

          <UtmBuilder form={form} />
          <MobileTargetingFields form={form} />
        </div>
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
