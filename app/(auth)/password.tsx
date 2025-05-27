import { SafeAreaView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PasswordForm } from '@/components/auth/password-form';

export default function PasswordScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 px-6">
        <View>
          <View className="flex items-start justify-end w-full h-20">
            <Button variant="ghost" onPress={() => router.back()} className="h-auto p-0 m-0">
              <Text className="text-sm text-gray-600">← Back</Text>
            </Button>
          </View>

          <PasswordForm />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
