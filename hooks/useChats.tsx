import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { Chat } from '@/types/chat';

export const fetchChats = async (userId: string): Promise<Chat[]> => {
  console.log('fetching Chats', userId);
  const res = await api.get('/tags/chats/', {
    params: {
      isDirectChat: true,
      isPublic: false,
      limit: 15,
      pageNumber: 1,
      messagesPageNumber: 1,
      messagesLimit: 15,
      data: ['members', 'files'],
      members: userId,
    },
  });

  return res.data.data.sort((a: any, b: any) => {
    const tsA = a.data.messages?.data?.[0]?.ts ?? 0;
    const tsB = b.data.messages?.data?.[0]?.ts ?? 0;
    return tsB - tsA;
  });
};

export const useChats = (userId: string | null) =>
  useQuery({
    queryKey: ['chats', userId],
    queryFn: () => fetchChats(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 2,
  });
