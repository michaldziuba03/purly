'use client';

import { z } from 'zod';
import { WORKSPACE_NAME_MAX } from '@purly/shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextControl,
} from '../../../../../components/form';
import { Button } from '../../../../../components/button';
import { Input } from '../../../../../components/input';
import { useAuth } from '../../../../../lib/auth';
import { AvatarUpload } from './avatar-upload';
import { useUpdateUser } from '../../../../../hooks/queries/useUsers';

const updateAccountSchema = z.object({
  username: z.string().min(1).max(WORKSPACE_NAME_MAX),
  avatarFile: z.any().nullable(),
});
type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;

export function UpdateAccountForm() {
  const { user } = useAuth();
  const { isLoading, mutateAsync } = useUpdateUser();
  const form = useForm<UpdateAccountSchema>({
    resolver: zodResolver(updateAccountSchema),
    defaultValues: {
      username: user.username,
      avatarFile: null,
    },
  });

  async function handleSubmit(data: UpdateAccountSchema) {
    const result = await mutateAsync(data);
    form.reset({
      username: result.username,
      avatarFile: null,
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="avatarFile"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="font-bold">Image</FormLabel>
              <FormTextControl>
                <AvatarUpload {...field} defaultImage={user.picture} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="font-bold">Username</FormLabel>
              <span className="text-sm text-muted-foreground">
                Change your account display name
              </span>
              <FormTextControl>
                <Input {...field} className="w-96" />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <Button disabled={!form.formState.isDirty || isLoading} type="submit">
            {isLoading ? 'Updating...' : 'Update profile'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
