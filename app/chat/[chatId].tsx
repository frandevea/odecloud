import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ArrowLeft, Paperclip } from 'lucide-react-native';

import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ChatMessageItem } from '@/components/chat/chat-message-item';
import { getChatMessages } from '@/hooks/useChatMessages';
import { Chat, Message } from '@/types/chat';
import { authStore } from '@/stores/authStore';

export default function ChatScreen() {
  const { chatId } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');

  const userId = authStore.get().userId;
  const allChats = queryClient.getQueryData<Chat[]>(['chats', userId]);
  const chat = allChats?.find((c) => c._id === chatId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<
    { data: Message[]; hasNextPage: boolean },
    Error
  >({
    queryKey: ['chatMessages', chatId],
    queryFn: ({ pageParam = 1 }) =>
      getChatMessages(chatId as string, {
        page: pageParam as number,
        limit: 15,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    initialData:
      chat && chat.data?.messages
        ? {
            pages: [
              {
                data: chat.data.messages.data,
                hasNextPage: chat.data.messages.hasNextPage,
              },
            ],
            pageParams: [1],
          }
        : undefined,
    enabled: !!chatId,
  });

  const messages = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 py-2 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeft className="text-foreground" size={24} />
        </TouchableOpacity>
        <View className="flex-row items-center flex-1 gap-2">
          <View className="w-8 h-8 rounded-full bg-muted" />
          <View>
            <Text className="font-medium text-foreground">
              {chat?.data.members?.[0]?.profile?.firstName ?? 'Chat'}
            </Text>
            <Text className="text-xs text-muted-foreground">Online</Text>
          </View>
        </View>
      </View>

      {/* Messages */}
      <View className="flex-1">
        {messages.length > 0 ? (
          <FlatList
            data={messages}
            style={{ flex: 1 }}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <ChatMessageItem message={item} messages={messages} chat={chat!} />
            )}
            inverted
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 40,
              flexGrow: 1,
            }}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.2}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator /> : null}
          />
        ) : (
          <View className="items-center justify-center flex-1">
            <Image
              source={require('@/assets/images/chat-empty.png')}
              className="w-20 h-20 opacity-50"
              resizeMode="contain"
            />
            <Text className="mt-2 text-base text-muted-foreground">Send the first message!</Text>
          </View>
        )}
      </View>
      {/* Input */}
      <View className="flex-row items-center gap-2 px-3 py-2 border-t border-border">
        <TouchableOpacity className="p-2">
          <Paperclip className="text-muted-foreground" size={22} />
        </TouchableOpacity>
        <Input
          placeholder="Send a message"
          value={message}
          onChangeText={setMessage}
          className="flex-1 h-10 px-4 text-base border-0 rounded-full bg-muted placeholder:text-muted-foreground"
        />
      </View>
    </SafeAreaView>
  );
}
