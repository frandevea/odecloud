import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRelativeTimestamp } from '@/lib/utils';

interface ChatListItemProps {
  chat: any;
  userId: string;
  onPress: () => void;
}

export default function ChatListItem({ chat, userId, onPress }: ChatListItemProps) {
  const otherMembers = chat.data.members.filter((m: any) => m._id !== userId);
  const otherUser = otherMembers[0];
  const lastMessage = chat.data.messages.data?.[0];

  const userName =
    `${otherUser?.profile?.firstName ?? ''} ${otherUser?.profile?.lastName ?? ''}`.trim();
  const userInitials = (
    (otherUser?.profile?.firstName?.[0] ?? '') + (otherUser?.profile?.lastName?.[0] ?? '')
  ).toUpperCase();

  const lastMessageTime = lastMessage?.createdAt
    ? getRelativeTimestamp(lastMessage.createdAt)
    : null;

  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-3 ">
      <View className="py-4">
        <Avatar alt={userName || 'User avatar'} className="h-14 w-14">
          <AvatarImage source={{ uri: otherUser?.profile?.avatar?.secureUrl }} />
          <AvatarFallback>
            {userInitials ? (
              <Text className="text-xs font-medium text-muted-foreground">{userInitials}</Text>
            ) : null}
          </AvatarFallback>
        </Avatar>
      </View>
      <View className="flex-1 h-full pt-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-medium text-foreground">
            {userName || 'Unknown User'}
          </Text>
          {lastMessageTime && (
            <Text className="text-xs text-muted-foreground">{lastMessageTime}</Text>
          )}
        </View>

        <Text className="text-sm text-muted-foreground" numberOfLines={1}>
          {lastMessage?.rawText ?? 'No messages yet'}
        </Text>
      </View>
    </Pressable>
  );
}
