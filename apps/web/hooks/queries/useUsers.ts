'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../../lib/api/client';
import { uploadFile } from '../../lib/upload';
import { useToast } from '../useToast';
import { getUserKey } from '../../lib/key-factories';

export function useCurrentUser() {
  const userKey = getUserKey();
  const query = useQuery(
    userKey,
    async () => {
      const result = await client.get('/users/me');
      return result.data;
    },
    {
      refetchOnMount: false,
    }
  );

  return query;
}

interface IUpdateUser {
  avatarFile?: File;
  username?: string;
}

async function updateUser(data: IUpdateUser) {
  const form: { pictureFile?: string; username?: string } = {
    username: data.username,
  };

  if (data.avatarFile) {
    form.pictureFile = await uploadFile(data.avatarFile);
  }

  const result = await client.patch('/users/me', form);

  return result.data;
}

export function useUpdateUser() {
  const userKey = getUserKey();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const mut = useMutation(userKey, {
    mutationFn: (data: IUpdateUser) => updateUser(data),
    onSuccess: (result) => {
      queryClient.setQueryData(userKey, result);
      return toast({
        title: 'Profile updated successfully',
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
