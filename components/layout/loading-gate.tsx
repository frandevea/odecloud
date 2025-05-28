import { usePrefetch } from '@/hooks/usePrefetch';
import { useEffect, useState } from 'react';
import LoadingScreen from './loading-screen';
import { hasBootstrapped } from '@/stores/bootStore';
import { useStore } from '@nanostores/react';

export const LoadingGate = ({ children }: { children: React.ReactNode }) => {
  const { prefetch } = usePrefetch();
  const booted = useStore(hasBootstrapped);

  const [isLoading, setIsLoading] = useState(!booted);

  useEffect(() => {
    const load = async () => {
      if (!booted) {
        await prefetch();
        hasBootstrapped.set(true);
        setIsLoading(false);
      }
    };
    load();
  }, [booted, prefetch]);

  if (isLoading) return <LoadingScreen />;

  return <>{children}</>;
};
