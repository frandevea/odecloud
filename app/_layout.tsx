import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from 'components/SplashScreen';
import EmailScreen from 'app/(auth)/EmailScreen';

import '../global.css';
import { useState } from 'react';

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false);
  if (!isAppReady) {
    return (
      <SplashScreen onFinish={(isCancelled: boolean) => !isCancelled && setIsAppReady(true)} />
    );
  }
  return (
    <>
      <EmailScreen />
      <StatusBar style="auto" />
    </>
  );
}
