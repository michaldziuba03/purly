import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getInvitesKey } from '../../lib/key-factories';
import { useWorkspace } from '../../app/app/workspace';
import client from '../../lib/api/client';
import { useToast } from '../useToast';
import { formatError } from '../../lib/utils';

export function useInvites() {
  const { currentWorkspace } = useWorkspace();
  const invitesKey = getInvitesKey(currentWorkspace.id);
  const query = useQuery(invitesKey, async () => {
    const result = await client.get(
      `/workspaces/${currentWorkspace.id}/members/invites`
    );
    return result.data;
  });

  return query;
}

interface ICreateInvite {
  email: string;
  role?: number;
}

export function useCreateInvite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { currentWorkspace } = useWorkspace();
  const invitesKey = getInvitesKey(currentWorkspace.id);
  const mut = useMutation(
    invitesKey,
    async (data: ICreateInvite) => {
      const result = await client.post(
        `/workspaces/${currentWorkspace.id}/members/invites`,
        data
      );
      return result.data;
    },
    {
      onSuccess: (newInvite) => {
        queryClient.setQueryData(invitesKey, (invites: any) => [
          ...invites,
          newInvite,
        ]);
        return toast({
          title: 'Invite sent',
        });
      },
      onError: (err) =>
        toast({
          title: formatError(err),
          variant: 'destructive',
        }),
    }
  );

  return mut;
}
