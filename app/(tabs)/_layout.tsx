import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/custom-tab-bar';
import { Inbox } from '@/lib/icons/Inbox';
import { ClipboardList } from '@/lib/icons/ClipboardList';
import { Users } from '@/lib/icons/Users';
import { MessageSquare } from '@/lib/icons/MessageSquare';

const tabs = [
  { name: 'inbox', label: 'Inbox', icon: Inbox },
  { name: 'task', label: 'Task', icon: ClipboardList },
  { name: 'feed', label: 'Feed', icon: Users },
  { name: 'chat', label: 'Chat', icon: MessageSquare },
] as const;

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <CustomTabBar {...props} />}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ focused }) => {
              const Icon = tab.icon;
              return (
                <Icon className={`h-6 w-6 ${focused ? 'text-primary' : 'text-muted-foreground'}`} />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}
