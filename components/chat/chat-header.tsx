import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

type ChatHeaderProps = {
  userName?: string;
  userAvatarUrl?: string;
  isOnline?: boolean;
};

export default function ChatHeader({
  userName = 'User',
  userAvatarUrl,
  isOnline = true,
}: ChatHeaderProps) {
  return (
    <View className="flex-row items-center justify-between px-6 py-5">
      <Text className="text-4xl font-semibold text-foreground">Chat</Text>

      <View className="relative">
        <Avatar alt={userName} className="h-14 w-14">
          <AvatarImage source={{ uri: userAvatarUrl }} />
          <AvatarFallback />
        </Avatar>

        {isOnline && (
          <View
            className={cn(
              'absolute bottom-0 right-0 h-5 w-5 rounded-full border-2 border-white bg-green-500'
            )}
          />
        )}
      </View>
    </View>
  );
}
