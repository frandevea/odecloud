import { Button } from '@/components/ui/button';
import { EmptyContent } from '@/components/ui/empty-content';
import { router } from 'expo-router';
import { Text } from '@/components/ui/text';

export default function NotFoundScreen() {
  return (
    <EmptyContent
      title="404"
      subtitle="Oops, there is nothing here"
      description="If you think there is a mistake, you can contact our team.">
      <Button variant="outline">
        <Text className="font-semibold text-black">Help center</Text>
      </Button>
      <Button onPress={() => router.back()} variant="action">
        <Text className="text-white">Go back</Text>
      </Button>
    </EmptyContent>
  );
}
