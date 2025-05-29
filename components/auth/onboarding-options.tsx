import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { Check } from '@/lib/icons/Check';
import { AtSign } from '@/lib/icons/AtSign';
import { Sparkles } from '@/lib/icons/Sparkles';
import { VolumeX } from '@/lib/icons/VolumeX';
import { cn } from '@/lib/utils';

export type NotificationOption = 'mentions' | 'everything' | 'silent';

type Option = {
  id: NotificationOption;
  icon: React.ElementType;
  title: string;
  description: string;
};

type Props = {
  selectedOption: NotificationOption;
  setSelectedOption: (option: NotificationOption) => void;
};

const options: Option[] = [
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
];

export function OnboardingOptions({ selectedOption, setSelectedOption }: Props) {
  return (
    <View className="flex flex-col gap-y-3">
      {options.map((option) => {
        const isSelected = selectedOption === option.id;
        const Icon = option.icon;
        return (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedOption(option.id)}
            testID={`option-${option.id}`}>
            <Card
              className={cn(
                'flex-row items-start p-4',
                isSelected ? 'border-2 border-primary text-primary' : 'border-border'
              )}>
              <Icon className={cn(isSelected && 'text-primary')} />
              <View className="flex-1 ml-2">
                <Text className="text-lg font-semibold">{option.title}</Text>
                <Text className="mt-1 text-sm text-muted-foreground">{option.description}</Text>
              </View>
              <View className="ml-2">
                <Check className={cn(isSelected && 'text-primary', !isSelected && 'opacity-0')} />
              </View>
            </Card>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
