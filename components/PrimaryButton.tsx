import { Text, TouchableOpacity } from 'react-native';

export function PrimaryButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`mb-4 items-center rounded-md p-4 ${disabled ? 'bg-gray-300' : 'bg-black'}`}>
      <Text className="text-base font-semibold text-white">{label}</Text>
    </TouchableOpacity>
  );
}
