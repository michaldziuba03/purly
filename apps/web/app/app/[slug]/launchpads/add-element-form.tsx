'use client';

import { useForm } from 'react-hook-form';
import { Button } from '../../../../components/button';
import { Input } from '../../../../components/input';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddElement } from '../../../../hooks/queries/useLaunchpads';
import { toast } from '../../../../hooks/useToast';
import { formatError } from '../../../../lib/utils';

const addElementSchema = z.object({
  label: z.string().max(64).nonempty(),
  url: z.string().url().nonempty(),
});
type AddElement = z.infer<typeof addElementSchema>;

interface AddElementFormProps {
  setShowForm: (bool: boolean) => void;
}

export function AddElementForm(props: AddElementFormProps) {
  const form = useForm<AddElement>({
    resolver: zodResolver(addElementSchema),
    defaultValues: {
      label: '',
      url: '',
    },
  });

  const { isLoading, mutate } = useAddElement();

  function handleSubmit(data: AddElement) {
    mutate(data, {
      onError: (err) =>
        toast({
          title: formatError(err),
          variant: 'destructive',
        }),
      onSuccess: () => props.setShowForm(false),
    });
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 py-8 px-16 bg-white border-primary border-[1px] rounded-lg"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Button label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="My button"
                  className="max-w-sm"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ex. http://example.com" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="pt-4 w-full flex gap-4 justify-end">
          <Button
            onClick={() => props.setShowForm(false)}
            type="button"
            variant="secondary"
          >
            {'Cancel'}
          </Button>

          <Button disabled={!form.formState.isValid || isLoading}>
            {isLoading ? 'Sending...' : 'Create'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
