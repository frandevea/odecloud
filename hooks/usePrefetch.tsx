import { useQueryClient } from '@tanstack/react-query';
import { fetchUserDetails } from '@/lib/api/user';
import { fetchChats } from '@/hooks/useChats';
import { authStore } from '@/stores/authStore';

export const usePrefetch = () => {
  const queryClient = useQueryClient();

  const prefetch = async () => {
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
  };

  return { prefetch };
};
