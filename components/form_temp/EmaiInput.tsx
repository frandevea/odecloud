import { Text, TextInput, View } from 'react-native';

export function EmailInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View className="mb-6">
      <Text className="mb-1 text-sm text-gray-600">Email</Text>
      <TextInput
        className="p-3 text-base text-black border border-gray-300 rounded-md"
        value={value}
        onChangeText={onChange}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="you@example.com"
      />
    </View>
  );
}
