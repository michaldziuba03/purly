import client from './client';

export function login(data: {
  email: string;
  password: string;
  recaptcha: string;
}) {
  return client.post('/auth/login', data);
}

export function requestResetPassword(data: {
  email: string;
  recaptcha: string;
}) {
  return client.post('/auth/reset/request', data);
}

export function changePassword(data: { token: string; password: string }) {
  return client.post('/auth/reset', data);
}

export function logout() {
  return client.post('/auth/logout');
}
