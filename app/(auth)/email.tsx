import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRememberedEmail } from '@/hooks/useRememberedEmail';
import { EmailForm } from '@/components/auth/email-form';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

export default function EmailScreen() {
  const { loading } = useRememberedEmail();

  if (loading) {
    return (
      <SafeAreaView className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <View className="w-full h-20 p-4" />

        <View className="justify-between flex-1 p-6 pt-0">
          <View>
            <EmailForm />
          </View>

          <View className="items-center">
            <Text className="mb-2 text-sm text-gray-600">Not an OdeCloud consultant yet?</Text>
            <Button
              variant="outline"
              className="mb-4 w-full border-[#E5E5E5] bg-white p-4"
              onPress={() =>
                Alert.alert('Coming soon', 'Apply now feature will be available soon.')
              }>
              <Text className="text-base font-semibold text-black">Apply now</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
