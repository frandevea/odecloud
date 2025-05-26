import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useUser } from '@/hooks/useUser';
import { authStore } from '@/stores/authStore';

export default function ChatHeader() {
  const userId = authStore.get().userId;
  const { data: user } = useUser(userId);
  const userName = `${user?.profile?.firstName ?? ''} ${user?.profile?.lastName ?? ''}`.trim();
  const userAvatarUrl = user?.profile?.avatar?.secureUrl;
  const isOnline = true; // puedes cambiar esto si tienes una forma de saber el estado real
  const userInitials = (
    (user?.profile?.firstName?.[0] ?? '') + (user?.profile?.lastName?.[0] ?? '')
  ).toUpperCase();
  return (
    <View className="flex-row items-center justify-between px-6 py-5">
      <Text className="text-4xl font-semibold text-foreground">Chat</Text>

      <View className="relative">
        <Avatar alt={userName} className="h-14 w-14">
          <AvatarImage source={{ uri: userAvatarUrl }} />
          <AvatarFallback>
            {userInitials ? (
              <Text className="text-lg font-medium text-muted-foreground">{userInitials}</Text>
            ) : null}
          </AvatarFallback>
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
