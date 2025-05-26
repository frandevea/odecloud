import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Inbox } from '@/lib/icons/Inbox';
import { ClipboardList } from '@/lib/icons/ClipboardList';
import { Users } from '@/lib/icons/Users';
import { MessageSquare } from '@/lib/icons/MessageSquare';
import { cn } from '@/lib/utils';

const tabs = [
  { name: 'inbox', label: 'Inbox', icon: Inbox },
  { name: 'task', label: 'Task', icon: ClipboardList },
  { name: 'feed', label: 'Feed', icon: Users },
  { name: 'chat', label: 'Chat', icon: MessageSquare },
] as const;

function TabIcon({ label, Icon, focused }: { label: string; Icon: any; focused: boolean }) {
  return (
    <View className="items-center justify-center">
      <View className={cn('rounded-full p-1 px-4', focused && 'bg-primary/10')}>
        <Icon className={cn('h-6 w-6', focused ? 'text-primary' : 'text-muted-foreground')} />
      </View>
      <Text className={cn('mt-1 text-xs', focused ? 'text-primary' : 'text-muted-foreground')}>
        {label}
      </Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const tab = tabs.find((t) => t.name === route.name);
        if (!tab) return {};

        return {
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            height: 70,
          },
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <TabIcon label={tab.label} Icon={tab.icon} focused={focused} />
          ),
        };
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen key={tab.name} name={tab.name} options={{ href: `/${tab.name}` }} />
      ))}
    </Tabs>
  );
}
