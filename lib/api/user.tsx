import api from '@/lib/api';

export const fetchUserDetails = async (userId: string) => {
  console.log('fetching user details', userId);
  const res = await api.get(`/users/${userId}`, {
    params: {
      articles: 1,
      roles: 1,
      skillsets: 1,
      snsLinks: 1,
      masterNotifications: 1,
      appStore: 1,
      profileCompletion: 1,
      wallet: 1,
    },
  });

  return res.data;
};
