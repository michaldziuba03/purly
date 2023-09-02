'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from '../../app/app/workspace';
import { getLinks, deleteLink, createLink } from '../../lib/api';
import { useToast } from '../useToast';
import { getLinksKey } from '../../lib/key-factories';

export function useLinks() {
  const { currentWorkspace } = useWorkspace();
  const linksKey = getLinksKey(currentWorkspace.id);
  const { data, error, isLoading } = useQuery(linksKey, () => {
    return getLinks(currentWorkspace.id);
  });

  return { data, error, isLoading };
}

export function useDeleteLink() {
  const { currentWorkspace } = useWorkspace();
  const { toast } = useToast();

  const linksKey = getLinksKey(currentWorkspace.id);
  const queryClient = useQueryClient();

  const { error, isLoading, mutateAsync } = useMutation(linksKey, {
    mutationFn: (linkId: string) => deleteLink(currentWorkspace.id, linkId),
    onSuccess(_data: any, linkId: string) {
      queryClient.setQueryData(linksKey, (links: any) => {
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
  const linksKey = getLinksKey(currentWorkspace.id);
  const { error, isLoading, mutateAsync } = useMutation(linksKey, {
    mutationFn: (data: object) => createLink(currentWorkspace.id, data),
    onSuccess(newLink: object) {
      queryClient.setQueryData(linksKey, (links: any) => {
        return [...links, newLink];
      });
    },
  });

  return { error, isLoading, mutateAsync };
}
