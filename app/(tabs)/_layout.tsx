import { SafeAreaView, View } from 'react-native';
import { Tabs, usePathname } from 'expo-router';
import TabsHeader from '@/components/layout/tabs-header';
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
  const pathname = usePathname();
  const currentTab = pathname.split('/').pop();
  const tabInfo = tabs.find((tab) => tab.name === currentTab);
  const title = tabInfo?.label;

  return (
    <SafeAreaView className="flex-1 bg-background">
      {title ? (
        <View className="px-4 pt-4">
          <TabsHeader title={title} />
        </View>
      ) : null}

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
                  <Icon
                    className={`h-6 w-6 ${focused ? 'text-primary' : 'text-muted-foreground'}`}
                  />
                );
              },
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
}
