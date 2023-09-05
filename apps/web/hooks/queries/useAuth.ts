'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserKey } from '../../lib/key-factories';
import client from '../../lib/api/client';

interface IRegister {
  email: string;
  username: string;
  password: string;
  recaptcha: string;
}

async function register(data: IRegister) {
  const result = await client.post('/auth/register', data);
  return result.data;
}

export function useRegister() {
  const userKey = getUserKey();
  const mutation = useMutation(userKey, {
    mutationFn: (data: IRegister) => register(data),
  });

  return mutation;
}

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
    mutationFn: (data: ILogin) => login(data),
  });

  return mutation;
}

export function logout() {
  return client.post('/auth/logout');
}

export function useLogout() {
  const userKey = getUserKey();
  const queryClient = useQueryClient();
  const mutation = useMutation(userKey, {
    mutationFn: () => logout(),
    onSuccess: () => queryClient.removeQueries(),
  });

  return mutation;
}

interface IForgotPassword {
  email: string;
  recaptcha: string;
}

export function useForgotPassword() {
  const mut = useMutation({
    mutationFn: async (data: IForgotPassword) => {
      const result = await client.post('/auth/reset/request', data);
      return result.data;
    },
  });

  return mut;
}
