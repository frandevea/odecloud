import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  if (!state || !state.routes) return null;

  return (
    <View
      className={cn(
        'absolute bottom-12 left-6 right-6 flex-row justify-between rounded-xl bg-white px-4 py-2',
        'border border-black/5 shadow-lg'
      )}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : typeof options.title === 'string'
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const iconRender = options.tabBarIcon?.({
          focused: isFocused,
          color: '',
          size: 24,
        });

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            className="items-center justify-center flex-1">
            <View className={cn('rounded-xl px-4 py-1', isFocused && 'bg-primary/10')}>
              {iconRender}
            </View>
            <Text
              className={cn(
                'text-md mt-1 font-semibold',
                isFocused ? 'text-primary' : 'text-muted-foreground'
              )}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
