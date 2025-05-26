import React, { useState, useEffect } from 'react';
import { Text, ActivityIndicator, Animated, Image, SafeAreaView } from 'react-native';

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
  const [screenOverallOpacityAnim] = useState(new Animated.Value(1));

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
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const lastTextVisibilityDuration = 1500;
      const screenFadeOutDuration = 500;

      const finishTimer = setTimeout(() => {
        Animated.timing(screenOverallOpacityAnim, {
          toValue: 0,
          duration: screenFadeOutDuration,
          useNativeDriver: true,
        }).start(() => {
          onFinish(false);
        });
      }, lastTextVisibilityDuration);
      return () => clearTimeout(finishTimer);
    }
  }, [currentTextIndex, fadeAnim, onFinish, screenOverallOpacityAnim]);

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <Animated.View
        style={{ opacity: screenOverallOpacityAnim }}
        className="items-center justify-end w-full">
        <Image
          source={require('../assets/images/bg_splash.png')}
          resizeMode="cover"
          className="w-full h-full"
        />
        <ActivityIndicator />
        <Animated.View style={{ opacity: fadeAnim }} className="pb-12">
          <Text className="mt-5 text-lg text-gray-800 ">{texts[currentTextIndex]}</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default SplashScreen;
