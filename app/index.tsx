// app/index.tsx
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import SplashScreen from '../components/SplashScreen';
import { restoreSession } from '../lib/auth';
import * as SecureStore from 'expo-secure-store';

// Manejamos el estado global de redirección y splash
export default function Index() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);

  // Decidir la ruta de destino al iniciar
  useEffect(() => {
    const bootstrap = async () => {
      const loggedIn = await restoreSession();

      if (!loggedIn) {
        setTargetRoute('/(auth)/EmailScreen');
        return;
      }

      const hasSeenOnboarding = await SecureStore.getItemAsync('hasSeenOnboarding');
      setTargetRoute(hasSeenOnboarding ? '/(tabs)/Chat' : '/(auth)/OnboardingScreen');
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
