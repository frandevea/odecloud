import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="Inbox" options={{ tabBarLabel: 'Inbox' }} />
      <Tabs.Screen name="Task" options={{ tabBarLabel: 'Task' }} />
      <Tabs.Screen name="Feed" options={{ tabBarLabel: 'Feed' }} />
      <Tabs.Screen name="Chat" options={{ tabBarLabel: 'Chat' }} />
    </Tabs>
  );
}
