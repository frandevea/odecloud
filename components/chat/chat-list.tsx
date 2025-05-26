import { FlatList } from 'react-native';
import ChatListItem from './chat-list-item';
import { Chat } from '@/types/chat';
import ChatSearchInput from './chat-search-input';

interface ChatListProps {
  chats: Chat[];
  userId: string;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ chats, userId, onSelectChat }: ChatListProps) {
  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 12 }}
      renderItem={({ item }) => (
        <ChatListItem chat={item} userId={userId} onPress={() => onSelectChat(item._id)} />
      )}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<ChatSearchInput />}
    />
  );
}
