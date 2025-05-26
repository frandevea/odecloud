import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { MessageSquareDashed } from '@/lib/icons/MessageSquareDashed';
import { ArrowRight } from '@/lib/icons/ArrowRight';

export default function ChatEmptyState() {
  const router = useRouter();

  const handleGoToFeed = () => {
    router.push('/(tabs)/feed');
  };

  return (
    <View className="items-center justify-center flex-1 p-6 pb-32">
      <View className="p-4 mb-4">
        <MessageSquareDashed size={48} className="text-primary" />
      </View>

      <Text className="mb-2 text-2xl font-semibold text-foreground">No chat</Text>
      <Text className="max-w-xs text-justify text-muted-foreground">
        You don&apos;t have any chatroom yet.
      </Text>
      <Text className="max-w-xs mb-8 text-justify text-muted-foreground">
        Start meeting peers in OdeSocial.
      </Text>

      <Button variant="action" size="lg" className="flex flex-row w-full" onPress={handleGoToFeed}>
        <Text className="mr-2 text-primary-foreground">Go to the feed</Text>
        <ArrowRight size={18} className="text-primary-foreground" />
      </Button>
    </View>
  );
}
