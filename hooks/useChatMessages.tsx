import api from '@/lib/api';

export const getChatMessages = async (
  chatId: string,
  { page = 1, limit = 15 }: { page?: number; limit?: number }
) => {
  console.log('🔍 rendering more messages Chat ID:', chatId);
  const res = await api.get(`/tags/messages`, {
    params: {
      tagId: chatId,
      pageNumber: page,
      limit,
    },
  });

  return {
    data: res.data.data,
    hasNextPage: res.data.hasNextPage,
  };
};
