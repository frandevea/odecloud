import api from './api';
import * as SecureStore from 'expo-secure-store';
import { authStore } from '../stores/authStore';

export async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post('/login', {
    email,
    password,
    appurl: 'https://feed-alpha.odecloud.com',
  });

  const token = res.headers['X-Auth-Token'];
  const userId = res.headers['X-User-Id'];

  if (!token || !userId) {
    throw new Error('Token o User ID no encontrados en la respuesta');
  }

  await SecureStore.setItemAsync('token', token);
  await SecureStore.setItemAsync('userId', userId);
  authStore.set({ token, userId });
}

export async function restoreSession() {
  const token = await SecureStore.getItemAsync('token');
  const userId = await SecureStore.getItemAsync('userId');
  if (token && userId) {
    authStore.set({ token, userId });
    return true;
  }
  return false;
}

export async function logout() {
  await SecureStore.deleteItemAsync('token');
  await SecureStore.deleteItemAsync('userId');
  authStore.set({ token: null, userId: null });
}
