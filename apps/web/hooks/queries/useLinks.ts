'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLinks, deleteLink, createLink } from '../../lib/api';
import { useToast } from '../useToast';

export function useLinks() {
  const { currentWorkspace } = useWorkspace();
  const { data, error, isLoading } = useQuery(['links'], () => {
    return getLinks(currentWorkspace.id);
  });

  return { data, error, isLoading };
}

export function useDeleteLink() {
  const { currentWorkspace } = useWorkspace();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { error, isLoading, mutateAsync } = useMutation(['links'], {
    mutationFn: (linkId: string) => deleteLink(currentWorkspace.id, linkId),
    onSuccess(_data: any, linkId: string) {
      queryClient.setQueryData(['links'], (links: any) => {
        return links.filter((link: any) => link.id !== linkId);
      });

      toast({
        title: 'Successfully deleted link',
      });
    },
  });

  return { error, isLoading, mutateAsync };
}

export function useCreateLink() {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useWorkspace();
  const { error, isLoading, mutateAsync } = useMutation(['links'], {
    mutationFn: (data: object) => createLink(currentWorkspace.id, data),
    onSuccess(newLink: object) {
      queryClient.setQueriesData(['links'], (links: any) => {
        return [...links, newLink];
      });
    },
  });

  return { error, isLoading, mutateAsync };
}
