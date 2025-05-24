import {
  SafeAreaView,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { emailSchema } from '../../lib/validation';
import { getRememberedEmail, saveEmail, clearSavedEmail } from '../../lib/storage';
import { EmailInput } from '../../components/form/EmaiInput';
import { RememberCheckbox } from '../../components/form/RememberCheckbox';
import { PrimaryButton } from '../../components/PrimaryButton';

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [rememberEmail, setRememberEmail] = useState(true);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const saved = await getRememberedEmail();
      if (saved) setEmail(saved);
      setLoading(false);
    };
    load();
  }, []);

  const handleContinue = async () => {
    const result = emailSchema.safeParse({ email });

    if (!result.success) {
      const msg = result.error.format().email?._errors?.[0] || 'Invalid email';
      return Alert.alert('Error', msg);
    }

    if (rememberEmail) await saveEmail(email);
    else await clearSavedEmail();

    router.push({ pathname: '/(auth)/PasswordScreen', params: { email } });
  };

  if (loading) return null;

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1">
        <View className="w-full h-20 p-4" />

        <View className="justify-between flex-1 p-6 pt-0">
          <View>
            <Text className="py-4 text-5xl">👋</Text>
            <Text className="mb-8 text-3xl font-bold text-black">Sign in</Text>

            <EmailInput value={email} onChange={setEmail} />
            <RememberCheckbox
              checked={rememberEmail}
              onToggle={() => setRememberEmail(!rememberEmail)}
            />
            <PrimaryButton label="Continue" onPress={handleContinue} disabled={!email.trim()} />
          </View>

          <View className="items-center">
            <Text className="mb-2 text-sm text-gray-600">Not an OdeCloud consultant yet?</Text>
            <TouchableOpacity className="mb-4 w-full items-center rounded-md border border-[#E5E5E5] bg-white p-4">
              <Text className="text-base font-semibold">Apply now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
