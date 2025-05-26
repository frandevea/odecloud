// app/bootstrap.tsx
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { restoreSession } from '@/lib/auth';
import * as SecureStore from 'expo-secure-store';
import SplashScreen from '@/components/SplashScreen';

export default function BootstrapScreen() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  useEffect(() => {
    const bootstrap = async () => {
      const loggedIn = await restoreSession();

      if (!loggedIn) {
        setTargetRoute('/(auth)/EmailScreen');
        return;
      }

      const hasSeenOnboarding = await SecureStore.getItemAsync('hasSeenOnboarding');
      setTargetRoute(hasSeenOnboarding ? '/(tabs)/inbox' : '/(auth)/OnboardingScreen');
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
