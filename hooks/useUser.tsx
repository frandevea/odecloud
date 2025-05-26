import { useQuery } from '@tanstack/react-query';
import { fetchUserDetails } from '@/lib/api/user';

export const useUser = (userId: string | null) =>
  useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => fetchUserDetails(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
