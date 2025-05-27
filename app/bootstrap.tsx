import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

import SplashScreen from '@/components/SplashScreen';
import { restoreSession } from '@/lib/auth';
import { authStore } from '@/stores/authStore';
import { fetchChats } from '@/hooks/useChats';
import { fetchUserDetails } from '@/lib/api/user';

export default function BootstrapScreen() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const bootstrap = async () => {
      const loggedIn = await restoreSession();

      if (!loggedIn) {
        setTargetRoute('/(auth)/email');
        return;
      }

      const { userId } = authStore.get();
      if (userId) {
        await queryClient.prefetchQuery({
          queryKey: ['userDetails', userId],
          queryFn: () => fetchUserDetails(userId),
          staleTime: 1000 * 60 * 5,
        });
        await queryClient.prefetchQuery({
          queryKey: ['chats', userId],
          queryFn: () => fetchChats(userId),
          staleTime: 1000 * 60 * 2,
        });
      }

      const hasSeenOnboarding = await SecureStore.getItemAsync('hasSeenOnboarding');
      setTargetRoute(hasSeenOnboarding ? '/(tabs)/chat' : '/(auth)/OnboardingScreen');
    };

    bootstrap();
  }, []);

  useEffect(() => {
    if (splashFinished && targetRoute) {
      router.replace(targetRoute);
    }
  }, [splashFinished, targetRoute]);

  return <SplashScreen onFinish={() => setSplashFinished(true)} />;
}
