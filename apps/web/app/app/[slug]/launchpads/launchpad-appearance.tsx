'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../components/form';
import { Input } from '../../../../components/input';
import { Textarea } from '../../../../components/textarea';
import { H4 } from '../../../../components/typography';
import { ColorPicker } from '../../../../components/color-picker';
import { Button } from '../../../../components/button';
import { useUpdateLaunchpad } from '../../../../hooks/queries/useLaunchpads';
import { z } from 'zod';

const hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
const updateLaunchpadSchema = z.object({
  title: z.string().min(3).max(64),
  description: z.string().max(250).default(''),
  bgColor: z.string().regex(hexcolor),
  textColor: z.string().regex(hexcolor),
  btnColor: z.string().regex(hexcolor),
  btnTextColor: z.string().regex(hexcolor),
});

type UpdateLaunchpad = z.infer<typeof updateLaunchpadSchema>;

export function LaunchpadAppearance(props: any) {
  const { mutate, isError, isLoading } = useUpdateLaunchpad();
  const form = useForm<UpdateLaunchpad>({
    defaultValues: {
      title: props.title,
      description: props.description,
      bgColor: props.bgColor,
      textColor: props.textColor,
      btnColor: props.btnColor,
      btnTextColor: props.btnTextColor,
    },
  });

  function updateMetadata(data: UpdateLaunchpad) {
    mutate(data, {
      onSuccess: (result: any) => form.reset(result),
    });
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <form
          className="space-y-3 bg-white p-8 rounded-lg"
          onSubmit={form.handleSubmit(updateMetadata)}
        >
          <div className="mb-4">
            <H4>Profile info</H4>
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="max-w-sm"
                    placeholder="ex. Welcome!"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="bgColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background color</FormLabel>
                  <FormControl>
                    <ColorPicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text color</FormLabel>
                  <FormControl>
                    <ColorPicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={form.control}
              name="btnColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button color</FormLabel>
                  <FormControl>
                    <ColorPicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="btnTextColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button text color</FormLabel>
                  <FormControl>
                    <ColorPicker {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-end pt-8">
            <Button disabled={isLoading || !form.formState.isDirty}>
              {isLoading ? 'Updating...' : 'Update page'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
