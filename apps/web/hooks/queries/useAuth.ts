'use client';

import { useMutation } from '@tanstack/react-query';
import { getUserKey } from '../../lib/key-factories';
import client from '../../lib/api/client';

interface ILogin {
  email: string;
  password: string;
  recaptcha: string;
}

async function login(data: ILogin) {
  const result = await client.post('/auth/login', data);
  return result.data;
}

export function useLogin() {
  const userKey = getUserKey();
  const mutation = useMutation(userKey, {
    mutationFn: async (data: ILogin) => {
      await login(data);
    },
  });

  return mutation;
}
