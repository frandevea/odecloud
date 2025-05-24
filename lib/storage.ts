import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'rememberedEmail';

export const getRememberedEmail = () => SecureStore.getItemAsync(STORAGE_KEY);
export const saveEmail = (email: string) => SecureStore.setItemAsync(STORAGE_KEY, email);
export const clearSavedEmail = () => SecureStore.deleteItemAsync(STORAGE_KEY);
