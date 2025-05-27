import {
  SafeAreaView,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { navigateAfterLogin } from '@/lib/auth';

const passwordSchema = z.object({
  password: z.string().min(4, 'Password is too short'),
});

export default function PasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleContinue = async () => {
    const result = passwordSchema.safeParse({ password });

    if (!result.success) {
      const msg = result.error.format().password?._errors?.[0] || 'Invalid password';
      return Alert.alert('Error', msg);
    }

    if (!email || typeof email !== 'string') {
      return Alert.alert('Error', 'Missing email');
    }

    try {
      await login(email, password);
      await navigateAfterLogin();
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Login failed';
      Alert.alert('Login Error', message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="flex-1 px-6">
        <View>
          <View className="flex items-start justify-end w-full h-20">
            <TouchableOpacity onPress={() => router.back()} className="">
              <Text className="text-sm text-gray-600">← Back</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text className="py-4 text-5xl">👋</Text>
            <Text className="mb-8 text-3xl font-bold text-black">Welcome back!</Text>

            <PasswordInput value={password} onChange={setPassword} />
            <PrimaryButton
              label={isLoading ? 'Loading...' : 'Continue'}
              onPress={handleContinue}
              disabled={password.trim().length < 4 || isLoading}
            />
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            className="mb-4 w-full items-center rounded-md border border-[#E5E5E5] bg-white p-4"
            onPress={() => {
              Alert.alert('Coming soon', 'Forgot password not implemented yet');
            }}>
            <Text className="text-base font-semibold text-gray-700">Forgot password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
