// app/_layout.tsx
import { Slot, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from '../components/SplashScreen';
import * as SecureStore from 'expo-secure-store';
import { restoreSession } from '../lib/auth';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const bootstrap = async () => {
      const loggedIn = await restoreSession();
      if (!loggedIn) {
        router.replace('/(auth)/EmailScreen');
        return setIsAppReady(true);
      }

      const hasSeenOnboarding = await SecureStore.getItemAsync('hasSeenOnboarding');
      if (!hasSeenOnboarding) {
        router.replace('/(auth)/OnboardingScreen');
      } else {
        router.replace('/(tabs)/Chat');
      }

      setIsAppReady(true);
    };

    bootstrap();
  }, []);

  if (!isAppReady) {
    return (
      <SplashScreen onFinish={(isCancelled: boolean) => !isCancelled && setIsAppReady(true)} />
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
