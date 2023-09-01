'use client';

import { useMutation } from '@tanstack/react-query';
import client from '../../lib/api/client';
import { uploadFile } from '../../lib/upload';
import { useToast } from '../useToast';

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
  const { toast } = useToast();
  const mut = useMutation(['user'], {
    mutationFn: (data: IUpdateUser) => updateUser(data),
    onSuccess: () =>
      toast({
        title: 'Profile updated successfully',
      }),
    onError: () =>
      toast({
        title: 'Something went wrong...',
        variant: 'destructive',
      }),
  });

  return mut;
}
