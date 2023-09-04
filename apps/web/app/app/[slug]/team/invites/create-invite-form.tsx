'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormTextControl,
  FormMessage,
} from '../../../../../components/form';
import { Input } from '../../../../../components/input';
import { Button } from '../../../../../components/button';
import { useCreateInvite } from '../../../../../hooks/queries/useInvites';
import { z } from 'zod';
import { MemberRole } from '@purly/shared';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/select';
import { zodResolver } from '@hookform/resolvers/zod';

const createInviteSchema = z.object({
  email: z.string().email(),
  role: z.number().int().default(MemberRole.MEMBER),
});
type CreateInviteSchema = z.infer<typeof createInviteSchema>;

interface ICreateInviteFormProps {
  closeModal: (state: boolean) => void;
}

export function CreateInviteForm(props: ICreateInviteFormProps) {
  const form = useForm<CreateInviteSchema>({
    resolver: zodResolver(createInviteSchema),
    defaultValues: {
      email: '',
      role: MemberRole.MEMBER,
    },
  });
  const { isLoading, mutate } = useCreateInvite();

  function handleSubmit(data: CreateInviteSchema) {
    mutate(data, {
      onSuccess: () => props.closeModal(false),
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8 w-full"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-1.5">
              <FormLabel className="font-bold">Email address</FormLabel>
              <FormTextControl>
                <Input placeholder="johdoe@example.com" {...field} />
              </FormTextControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="role"
          control={form.control}
          render={({ field }) => (
            <Select
              onValueChange={(val: string) => field.onChange(parseInt(val))}
              value={field.value.toString()}
            >
              <FormItem className="flex flex-col space-y-1.5">
                <FormLabel className="font-bold">Role</FormLabel>
                <FormTextControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member role" />
                  </SelectTrigger>
                </FormTextControl>
                <SelectContent>
                  <SelectItem value={MemberRole.CLIENT.toString()}>
                    Readonly
                  </SelectItem>
                  <SelectItem value={MemberRole.MEMBER.toString()}>
                    Member
                  </SelectItem>
                  <SelectItem value={MemberRole.ADMIN.toString()}>
                    Admin
                  </SelectItem>
                  <SelectItem value={MemberRole.OWNER.toString()}>
                    Owner
                  </SelectItem>
                </SelectContent>
                <FormMessage />
              </FormItem>
            </Select>
          )}
        />

        <div className="mt-4 flex justify-end">
          <Button disabled={!form.formState.isDirty || isLoading} type="submit">
            {isLoading ? 'Inviting...' : 'Invite'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
