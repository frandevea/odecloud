import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { emailSchema } from '@/lib/validation';
import { saveEmail, clearSavedEmail } from '@/lib/storage';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useRememberedEmail } from '@/hooks/useRememberedEmail';

export function EmailForm() {
  const { email, setEmail } = useRememberedEmail();
  const [rememberEmail, setRememberEmail] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (value: string) => {
    const result = emailSchema.safeParse({ email: value });
    return result.success ? null : result.error.format().email?._errors?.[0] || 'Invalid email';
  };

  useEffect(() => {
    setEmailError(email.trim() ? validateEmail(email) : null);
  }, [email]);

  const handleContinue = async () => {
    const error = validateEmail(email);
    if (error) return setEmailError(error);

    if (rememberEmail) await saveEmail(email);
    else await clearSavedEmail();

    router.push({ pathname: '/(auth)/password', params: { email } });
  };

  return (
    <>
      <Text className="py-4 text-5xl">👋</Text>
      <Text className="mb-8 text-3xl font-bold text-black">Sign in</Text>

      <Input
        testID="email-input"
        accessibilityLabel="Email input"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        placeholder="Email"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        className="h-12 px-3 text-lg border border-input bg-background placeholder:text-muted-foreground"
      />
      {emailError && <Text className="mt-1 text-sm text-red-500">{emailError}</Text>}

      <View className="flex-row items-center my-4">
        <Checkbox
          checked={rememberEmail}
          onCheckedChange={(val) => setRememberEmail(val === true)}
        />
        <Text className="ml-2 text-sm text-gray-600">Remember me</Text>
      </View>

      <Button
        onPress={handleContinue}
        variant="action"
        disabled={!email.trim() || !!emailError}
        testID="continue-button">
        <Text className="text-base font-semibold text-primary-foreground">Continue</Text>
      </Button>
    </>
  );
}
