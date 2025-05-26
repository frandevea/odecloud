import { View } from 'react-native';
import ChatHeader from '@/components/chat/chat-header';

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-background">
      <ChatHeader userName="David" isOnline />
    </View>
  );
}
