import api from './api';
import * as SecureStore from 'expo-secure-store';
import { authStore } from '@/stores/authStore';
import { router } from 'expo-router';

export async function login({ email, password }: { email: string; password: string }) {
  const res = await api.post('/login/', {
    email,
    password,
    appUrl: 'https://feed-alpha.odecloud.com',
  });
  const data = res.data;
  const token = data.authToken;
  const userId = data.userId;
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
  await SecureStore.deleteItemAsync('hasSeenOnboarding');
  await SecureStore.deleteItemAsync('notificationPreference');
  authStore.set({ token: null, userId: null });
}

export async function navigateAfterLogin() {
  const seenOnboarding = await SecureStore.getItemAsync('hasSeenOnboarding');
  if (!seenOnboarding) {
    router.replace('/(auth)/onboarding');
  } else {
    router.replace('/(tabs)/chat');
  }
}
