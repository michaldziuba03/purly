'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getMembers } from '../../lib/api';
import { getMembersKey } from '../../lib/key-factories';
import client from '../../lib/api/client';
import { useToast } from '../useToast';
import { formatError } from '../../lib/utils';

export function useMembers() {
  const { currentWorkspace } = useWorkspace();
  const membersKey = getMembersKey(currentWorkspace.id);
  const query = useQuery(membersKey, () => {
    return getMembers(currentWorkspace.id);
  });

  return query;
}

interface IRemoveMember {
  userId: string;
}

export function useRemoveMember() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspace();
  const membersKey = getMembersKey(currentWorkspace.id);
  const mut = useMutation(
    membersKey,
    async (data: IRemoveMember) => {
      const result = await client.delete(
        `/workspaces/${currentWorkspace.id}/members/${data.userId}`
      );

      return result.data;
    },
    {
      onSuccess: (_, input) => {
        queryClient.setQueryData(membersKey, (members: any) =>
          members.filter((member: any) => member.user.id !== input.userId)
        );

        return toast({
          title: 'Member removed successfully',
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
