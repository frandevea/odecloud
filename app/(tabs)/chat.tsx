import { View } from 'react-native';
import ChatHeader from '@/components/chat/chat-header';
import ChatEmptyState from '@/components/chat/empty-state';
import ChatSearchInput from '@/components/chat/chat-search-input';

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      <ChatHeader userName="David" isOnline />
      <ChatSearchInput />
      <ChatEmptyState />
    </View>
  );
}
