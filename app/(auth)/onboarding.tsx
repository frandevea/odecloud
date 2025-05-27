import { SafeAreaView, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { OnboardingOptions, NotificationOption } from '@/components/auth/onboarding-options';

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<NotificationOption>('mentions');

  const handleFinish = async () => {
    await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
    await SecureStore.setItemAsync('notificationPreference', selectedOption);
    router.replace('/(tabs)/chat');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="justify-between flex-1 p-6 bg-background">
        <View className="justify-between flex-1">
          <View>
            <View className="items-start mb-8">
              <Text className="py-4 text-5xl">🔔</Text>
              <Text className="text-3xl font-semibold text-black">Never miss anything</Text>
              <Text className="text-sm text-muted-foreground">On mobile, notify me for</Text>
            </View>

            <OnboardingOptions
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
            />
          </View>

          <View>
            <Text className="mb-4 text-sm text-center text-muted-foreground">
              This does not affect desktop notifications
            </Text>
            <Button variant="action" size="lg" className="w-full" onPress={handleFinish}>
              <Text>Continue</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
