import { View, Image, ActivityIndicator, SafeAreaView } from 'react-native';

export default function LoadingScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-between flex-1 mt-48 mb-24 bg-background">
        <Image
          source={require('@/assets/images/logo_with_bg.png')}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <ActivityIndicator size="small" color="#999" />
      </View>
    </SafeAreaView>
  );
}
