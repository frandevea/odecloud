import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Animated,
  ImageBackground,
  Image,
  SafeAreaView,
} from 'react-native';

interface SplashScreenProps {
  onFinish: (isCancelled: boolean) => void;
}

const texts = [
  'Getting your workspace ready...',
  'Heating up notifications...',
  'Whispering to the servers...',
  'Taming the backlog dragons...',
];

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (currentTextIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setCurrentTextIndex(currentTextIndex + 1);
        });
      }, 1500); // Change text every 2 seconds + 0.5s fadeOut
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinish(false);
      }, 2000); // Show last text for 2.5s then finish
      return () => clearTimeout(finishTimer);
    }
  }, [currentTextIndex, fadeAnim, onFinish]);

  return (
    <SafeAreaView className="items-center justify-end flex-1 bg-white font-Poppins_Regular">
      <ImageBackground
        source={require('../assets/images/bg_splash.png')}
        resizeMode="cover"
        className="absolute flex items-center justify-start w-full h-full pt-64 top-12">
        <Image source={require('../assets/images/logo.png')} />
        <Text className="text-4xl font-medium text-white font-Poppins_Medium">OdeCloud</Text>
      </ImageBackground>
      <ActivityIndicator />
      <Animated.View style={{ opacity: fadeAnim }} className="pb-12">
        <Text className="mt-5 text-lg text-gray-800 ">{texts[currentTextIndex]}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;
