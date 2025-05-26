import { SafeAreaView, View, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Bell, Sparkles, AtSign, VolumeX, Check } from 'lucide-react-native';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function OnboardingScreen() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<'mentions' | 'everything' | 'silent'>(
    'mentions'
  );

  const handleFinish = async () => {
    await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
    await SecureStore.setItemAsync('notificationPreference', selectedOption);
    // Aquí podrías enviar el expoPushToken y selectedOption a tu backend
    console.log('Notification preference:', selectedOption);
    router.replace('/(tabs)/chat');
  };

  const options = [
    {
      id: 'everything',
      icon: Sparkles,
      title: 'Everything',
      description:
        'You want push notifications for everything. All posts, comments and mentions from OdeSocial, OdeTask and Chat.',
    },
    {
      id: 'mentions',
      icon: AtSign,
      title: 'Mentions',
      description:
        "You want push notifications when you're mentioned, assigned, have a new reply, comment or direct chat.",
    },
    {
      id: 'silent',
      icon: VolumeX,
      title: 'Silent',
      description:
        'No push notifications on mobile. Keep track of tasks, chat, social on the app, without getting notified at all.',
    },
  ] as const;

  return (
    <SafeAreaView className="justify-between flex-1 p-6 bg-background">
      <View className="justify-between flex-1 p-6 bg-background">
        <View>
          <View className="items-start mb-8">
            <Text className="py-4 text-5xl">🔔</Text>
            <Text className="text-3xl font-semibold text-black">Never miss anything</Text>
            <Text className="text-sm text-muted-foreground">On mobile, notify me for </Text>
          </View>

          <View className="flex flex-col gap-y-3">
            {options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <TouchableOpacity key={option.id} onPress={() => setSelectedOption(option.id)}>
                  <Card
                    className={cn(
                      'flex-row items-start p-4',
                      isSelected ? 'border-2 border-pink-500' : 'border-border'
                    )}>
                    <option.icon size={24} color={isSelected ? 'rgb(236 72 153)' : 'black'} />
                    <View className="flex-1 ml-2">
                      <Text className="text-lg font-semibold">{option.title}</Text>
                      <Text className="mt-1 text-sm text-muted-foreground">
                        {option.description}
                      </Text>
                    </View>
                    {isSelected && <Check size={24} color="rgb(236 72 153)" className="ml-2" />}
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
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
    </SafeAreaView>
  );
}
