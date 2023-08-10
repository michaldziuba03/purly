import axios from './axios';

export function login(data: {
  email: string;
  password: string;
  recaptcha: string;
}) {
  return axios.post('/auth/login', data);
}

export function requestResetPassword(data: {
  email: string;
  recaptcha: string;
}) {
  return axios.post('/auth/reset/request', data);
}

export function changePassword(data: { token: string; password: string }) {
  return axios.post('/auth/reset', data);
}
