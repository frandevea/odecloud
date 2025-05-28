import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { getRelativeTimestamp } from '@/lib/utils';
import { GroupAvatar } from '@/components/ui/group-avatar';

interface ChatListItemProps {
  chat: any;
  userId: string;
  onPress: () => void;
}

export default function ChatListItem({ chat, userId, onPress }: ChatListItemProps) {
  const members = chat.data.members ?? [];
  const otherMembers = members.filter((m: any) => m._id !== userId);
  const otherUser = otherMembers[0];
  const isGroup = members.length > 2;

  const lastMessage = chat.data.messages.data?.[0];

  const userName = isGroup
    ? (chat.title ?? 'Group')
    : `${otherUser?.profile?.firstName ?? ''} ${otherUser?.profile?.lastName ?? ''}`.trim();

  const userInitials = (
    (otherUser?.profile?.firstName?.[0] ?? '') + (otherUser?.profile?.lastName?.[0] ?? '')
  ).toUpperCase();

  const lastMessageTime = lastMessage?.createdAt
    ? getRelativeTimestamp(lastMessage.createdAt)
    : null;

  const avatars = members.map((m: any) => {
    const first = m.profile?.firstName?.[0] ?? '';
    const last = m.profile?.lastName?.[0] ?? '';
    return {
      uri: m.profile?.avatar?.secureUrl,
      initials: (first + last).toUpperCase(),
    };
  });

  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-3 px-3 ">
      <View className="py-4">
        {isGroup ? (
          <GroupAvatar avatars={avatars} />
        ) : (
          <Avatar alt={userName || 'User avatar'} className="h-14 w-14">
            <AvatarImage source={{ uri: otherUser?.profile?.avatar?.secureUrl }} />
            <AvatarFallback>
              {userInitials ? (
                <Text className="text-xs font-medium text-muted-foreground">{userInitials}</Text>
              ) : null}
            </AvatarFallback>
          </Avatar>
        )}
      </View>
      <View className="h-full flex-1 border-b border-gray-100 pt-4">
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
