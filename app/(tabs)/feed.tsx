import { EmptyContent } from '@/components/ui/empty-content';
import { SafeAreaView } from 'react-native';
import { Button } from '@/components/ui/button';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function Feed() {
  return (
    <SafeAreaView className="flex-1">
      <EmptyContent
        image={require('@/assets/images/message.png')}
        subtitle="No content"
        description="There is no content here yet">
        <Button variant="action" onPress={() => router.push('/(tabs)/chat')}>
          <Text className="text-primary-foreground">Add content</Text>
        </Button>
      </EmptyContent>
    </SafeAreaView>
  );
}
