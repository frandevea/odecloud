import { SafeAreaView, View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { emailSchema } from '../../lib/validation';
import { getRememberedEmail, saveEmail, clearSavedEmail } from '../../lib/storage';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { Text } from '../../components/ui/text';

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

            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              className="h-12 px-3 text-lg border border-input bg-background placeholder:text-muted-foreground"
            />
            <View className="flex-row items-center my-4">
              <Checkbox
                checked={rememberEmail}
                onCheckedChange={setRememberEmail}
                aria-label="Remember me"
              />
              <Text className="ml-2 text-sm text-gray-600">Remember me</Text>
            </View>
            <Button onPress={handleContinue} variant="action" disabled={!email.trim()}>
              <Text className="text-base font-semibold text-primary-foreground">Continue</Text>
            </Button>
          </View>

          <View className="items-center">
            <Text className="mb-2 text-sm text-gray-600">Not an OdeCloud consultant yet?</Text>
            <Button
              variant="outline"
              className="mb-4 h-auto w-full border-[#E5E5E5] bg-white p-4"
              onPress={() => {
                console.log('Apply now pressed');
              }}>
              <Text className="text-base font-semibold text-black">Apply now</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
