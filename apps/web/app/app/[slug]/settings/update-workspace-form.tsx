'use client';

import { z } from 'zod';
import { WORKSPACE_NAME_MAX } from '@purly/shared';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextControl,
} from '../../../../components/form';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWorkspace } from '../../workspace';
import { Label } from '../../../../components/label';

const updateWorkspaceSchema = z.object({
  name: z.string().min(1).max(WORKSPACE_NAME_MAX),
});
type UpdateWorkspaceSchema = z.infer<typeof updateWorkspaceSchema>;

export function UpdateWorkspaceForm() {
  const { currentWorkspace } = useWorkspace();
  const form = useForm<UpdateWorkspaceSchema>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      name: currentWorkspace.name,
    },
  });

  function handleSubmit(data: UpdateWorkspaceSchema) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="font-bold">Display Name</FormLabel>
              <span className="text-sm text-muted-foreground">
                Change workspace display name
              </span>
              <FormTextControl>
                <Input placeholder="Acme Inc." {...field} className="w-96" />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-1.5">
          <Label className="font-bold">Pathname</Label>
          <span className="text-sm text-muted-foreground">
            You cannot change workspace pathname
          </span>
          <Input disabled value={currentWorkspace.slug} className="w-96" />
        </div>

        <div className="mt-4">
          <Button disabled={!form.formState.isDirty} type="submit">
            {'Update workspace'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
