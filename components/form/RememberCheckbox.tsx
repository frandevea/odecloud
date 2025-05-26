import { View, TouchableOpacity, Text } from 'react-native';

export function RememberCheckbox({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <View className="flex-row items-center mb-8">
      <TouchableOpacity
        onPress={onToggle}
        className="items-center justify-center w-6 h-6 mr-3 border-2 border-pink-500 rounded">
        {checked && <View className="w-3 h-3 bg-pink-500 rounded-sm" />}
      </TouchableOpacity>
      <Text className="text-base text-black">Remember my email</Text>
    </View>
  );
}
