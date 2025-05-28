import { SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '@nanostores/react';
import { authStore } from '@/stores/authStore';

import { useChats } from '@/hooks/useChats';
import ChatList from '@/components/chat/chat-list';
import ChatEmptyState from '@/components/chat/empty-state';
import TabsHeader from '@/components/layout/tabs-header';

export default function ChatListScreen() {
  const router = useRouter();
  const { userId } = useStore(authStore);
  const { data: chats, isLoading } = useChats(userId);

  const handleSelectChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <SafeAreaView className="flex-1">
      <TabsHeader title="Chat" />
      <View className="flex-1 bg-background">
        {isLoading ? (
          <ChatEmptyState />
        ) : chats && chats.length > 0 && userId ? (
          <ChatList chats={chats} userId={userId} onSelectChat={handleSelectChat} />
        ) : (
          <ChatEmptyState />
        )}
      </View>
    </SafeAreaView>
  );
}
