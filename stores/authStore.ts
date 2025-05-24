import { atom } from 'nanostores';

export const authStore = atom<{ token: string | null; userId: string | null }>({
  token: null,
  userId: null,
});
