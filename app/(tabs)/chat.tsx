import { View } from 'react-native';
import ChatHeader from '@/components/chat/chat-header';
import ChatEmptyState from '@/components/chat/empty-state';

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      <ChatHeader userName="David" isOnline />
      <ChatEmptyState />
    </View>
  );
}
