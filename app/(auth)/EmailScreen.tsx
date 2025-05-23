import { Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useState } from 'react';

export default function EmailScreen() {
  const [email, setEmail] = useState('john.doe@gmail.com');
  const [rememberEmail, setRememberEmail] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      {/* Espacio reservado para el botón/componente "Go Back" */}
      <View className="w-full h-20 p-4">
        {/* Puedes ajustar la altura y el padding */}

        {/* <Text>Go Back Component Placeholder</Text> */}
      </View>

      <View className="justify-between flex-1 p-6 pt-0">
        {/* Eliminado padding superior para compensar el nuevo View */}
        {/* Sección Principal del Formulario */}
        <View>
          <Text className="py-4 text-5xl">👋</Text>
          <Text className="mb-8 text-3xl font-bold text-black">Sign in</Text>

          <View className="mb-6">
            <Text className="mb-1 text-sm text-gray-600">Email</Text>
            <TextInput
              className="p-3 text-base text-black border border-gray-300 rounded-md"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View className="flex-row items-center mb-8">
            {/* <Checkbox value={rememberEmail} onValueChange={setRememberEmail} /> */}
            <TouchableOpacity
              onPress={() => setRememberEmail(!rememberEmail)}
              className="items-center justify-center w-6 h-6 mr-3 border-2 border-pink-500 rounded">
              {rememberEmail && <View className="w-3 h-3 bg-pink-500 rounded-sm" />}
            </TouchableOpacity>
            <Text className="text-base text-black">Remember my email</Text>
          </View>

          <TouchableOpacity className="items-center p-4 mb-4 bg-black rounded-md">
            <Text className="text-base font-semibold text-white">Continue</Text>
          </TouchableOpacity>
        </View>

        {/* Sección Inferior */}
        <View className="items-center">
          <Text className="mb-2 text-sm text-gray-600">Not an OdeCloud consultant yet?</Text>
          <TouchableOpacity className="mb-4 w-full items-center rounded-md border border-[#E5E5E5] bg-white p-4">
            <Text className="text-base font-semibold">Apply now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
