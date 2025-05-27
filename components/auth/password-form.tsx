// components/auth/PasswordForm.tsx
import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { navigateAfterLogin } from '@/lib/auth';

const passwordSchema = z.object({
  password: z.string().min(4, 'Password is too short'),
});

export function PasswordForm() {
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
    <View>
      <Text className="py-4 text-5xl">👋</Text>
      <Text className="mb-8 text-3xl font-bold text-black">Welcome back!</Text>

      <PasswordInput value={password} onChange={setPassword} />

      <Button
        onPress={handleContinue}
        variant="action"
        disabled={password.trim().length < 4 || isLoading}>
        <Text className="text-base font-semibold text-primary-foreground">
          {isLoading ? 'Loading...' : 'Continue'}
        </Text>
      </Button>

      <Button
        variant="outline"
        accessibilityRole="button"
        className="mb-4 mt-6 h-auto w-full items-center rounded-md border border-[#E5E5E5] bg-white p-4"
        onPress={() => Alert.alert('Coming soon', 'Forgot password not implemented yet')}>
        <Text className="text-base font-semibold text-gray-700">Forgot password</Text>
      </Button>
    </View>
  );
}
