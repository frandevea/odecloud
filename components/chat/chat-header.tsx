import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/hooks/useUser';
import { authStore } from '@/stores/authStore';
import { useAuth } from '../../hooks/useAuth';
import { router } from 'expo-router';

export default function ChatHeader() {
  const userId = authStore.get().userId;
  const { data: user } = useUser(userId);
  const { logout } = useAuth();

  const userName = `${user?.profile?.firstName ?? ''} ${user?.profile?.lastName ?? ''}`.trim();
  const userAvatarUrl = user?.profile?.avatar?.secureUrl;
  const isOnline = true;
  const userInitials = (
    (user?.profile?.firstName?.[0] ?? '') + (user?.profile?.lastName?.[0] ?? '')
  ).toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/email');
  };

  return (
    <View className="flex-row items-center justify-between px-6 py-5">
      <Text className="text-4xl font-semibold text-foreground">Chat</Text>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <View className="relative">
            <Avatar alt={userName || 'Avatar de usuario'} className="h-14 w-14">
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
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onPress={handleLogout}>
            <Text>Logout</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
