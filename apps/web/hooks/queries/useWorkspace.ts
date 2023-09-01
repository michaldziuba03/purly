'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../../lib/api/client';
import { useToast } from '../useToast';

async function getWorkspaces() {
  const result = await client.get('/workspaces');
  return result.data;
}

export function useUserWorkspaces() {
  const query = useQuery(['workspace'], {
    queryFn: getWorkspaces,
    refetchOnMount: false,
  });

  return query.data;
}

// ====================================================================

interface ICreateWorkspace {
  name: string;
  slug: string;
}

async function createWorkspace(data: ICreateWorkspace) {
  const result = await client.post('/workspaces', data);
  return result.data;
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mut = useMutation(['workspace'], {
    mutationFn: (data: ICreateWorkspace) => createWorkspace(data),
    onSuccess: (result) => {
      queryClient.setQueryData(['workspace'], [result]);
      return toast({
        title: 'Workspace updated successfully',
      });
    },
    onError: () =>
      toast({
        title: 'Something went wrong...',
        variant: 'destructive',
      }),
  });

  return mut;
}

// ====================================================================

interface IUpdateWorkspace {
  name: string;
}

async function updateWorkspace(workspaceId: string, data: IUpdateWorkspace) {
  const result = await client.patch(`/workspaces/${workspaceId}`, data);
  return result.data;
}

export function useUpdateWorkspace(workspaceId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mut = useMutation(['workspace'], {
    mutationFn: (data: IUpdateWorkspace) => updateWorkspace(workspaceId, data),
    onSuccess: (result) => {
      queryClient.setQueriesData(['workspace'], (workspaces: any) => {
        const otherWorkspaces = workspaces.filter(
          (workspace: any) => workspace.id !== workspaceId
        );
        return [result, ...otherWorkspaces];
      });
      return toast({
        title: 'Workspace updated successfully',
      });
    },
    onError: () =>
      toast({
        title: 'Something went wrong...',
        variant: 'destructive',
      }),
  });

  return mut;
}
