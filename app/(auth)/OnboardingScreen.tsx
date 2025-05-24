import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { logout } from 'lib/auth';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleFinish = async () => {
    await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
    router.replace('/(tabs)/Chat');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to OdeCloud 🚀</Text>
      <Button title="Logout" onPress={() => logout()} />
      <Button title="Start" onPress={handleFinish} />
    </View>
  );
}
