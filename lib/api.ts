import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'https://server-alpha.odecloud.app/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  const userId = await SecureStore.getItemAsync('userId');

  if (token) {
    config.headers['X-Auth-Token'] = token;
  }
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }

  return config;
});

export default api;
