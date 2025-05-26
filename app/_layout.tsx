import { Slot } from 'expo-router';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { Theme, ThemeProvider, DefaultTheme, DarkTheme } from '@react-navigation/native';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '@/lib/constants';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import '@/global.css';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      document.documentElement.classList.add('bg-background');
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <QueryClientProvider client={queryClient}>
        <Slot />
        <PortalHost />

        <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
