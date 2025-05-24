import { useStore } from '@nanostores/react';
import { authStore } from '../stores/authStore';
import {
  login as loginFn,
  logout as logoutFn,
  restoreSession as restoreSessionFn,
} from '../lib/auth';
import { useState, useEffect } from 'react';

export function useAuth() {
  const auth = useStore(authStore);
  const [isLoading, setIsLoading] = useState(true);

  // Restaurar sesión solo al montar el hook
  useEffect(() => {
    const restore = async () => {
      await restoreSessionFn();
      setIsLoading(false);
    };
    restore();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await loginFn({ email, password });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutFn();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    token: auth.token,
    userId: auth.userId,
    isAuthenticated: !!auth.token && !!auth.userId,
    isLoading,
    login,
    logout,
  };
}
