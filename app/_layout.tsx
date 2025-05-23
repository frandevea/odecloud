import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import SplashScreen from 'components/SplashScreen';

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
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
