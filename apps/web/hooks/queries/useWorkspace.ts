'use client';

import { useMutation } from '@tanstack/react-query';
import client from '../../lib/api/client';
import { useToast } from '../useToast';

interface IUpdateWorkspace {
  name: string;
}

async function updateWorkspace(workspaceId: string, data: IUpdateWorkspace) {
  const result = await client.patch(`/workspaces/${workspaceId}`, data);
  return result;
}

export function useUpdateWorkspace(workspaceId: string) {
  const { toast } = useToast();
  const mut = useMutation(['workspace'], {
    mutationFn: (data: IUpdateWorkspace) => updateWorkspace(workspaceId, data),
    onSuccess: () =>
      toast({
        title: 'Workspace updated successfully',
      }),
    onError: () =>
      toast({
        title: 'Something went wrong...',
        variant: 'destructive',
      }),
  });

  return mut;
}
