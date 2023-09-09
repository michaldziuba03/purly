'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { z } from 'zod';
import { Form, FormControl, FormField } from '../../../../components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLaunchpad } from '../../../../hooks/queries/useLaunchpads';
import { toast } from '../../../../hooks/useToast';
import { formatError } from '../../../../lib/utils';

const createLaunchpadSchema = z.object({
  slug: z.string().min(3).max(64),
});
type CreateLaunchpad = z.infer<typeof createLaunchpadSchema>;

export function CreateLaunchpadForm() {
  const form = useForm<CreateLaunchpad>({
    resolver: zodResolver(createLaunchpadSchema),
    defaultValues: {
      slug: '',
    },
  });

  const { isLoading, mutate } = useCreateLaunchpad();

  function handleSubmit(data: CreateLaunchpad) {
    mutate(data, {
      onError: (err) =>
        toast({
          title: formatError(err),
          variant: 'destructive',
        }),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex items-center gap-4"
      >
        <div className="flex flex-1 gap-4">
          <Input className="w-auto" disabled value="localhost:4200" />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormControl className="w-full">
                <Input
                  {...field}
                  className="flex-1 w-full"
                  placeholder="Your name or bussiness"
                />
              </FormControl>
            )}
          />
        </div>
        <Button disabled={!form.formState.isValid || isLoading}>
          {isLoading ? 'Creating page...' : 'Create your page'}
        </Button>
      </form>
    </Form>
  );
}
