import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ActivityIndicator, Animated, Image, SafeAreaView } from 'react-native';
import { Text } from '@/components/ui/text';

interface SplashScreenProps {
  onFinish: (isCancelled: boolean) => void;
}

const texts = [
  'Getting your workspace ready...',
  'Heating up notifications...',
  'Whispering to the servers...',
  'Taming the backlog dragons...',
];

const Splash: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const screenOpacityAnim = useRef(new Animated.Value(1)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(
    (callback?: () => void) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(callback);
    },
    [fadeAnim]
  );

  const handleFinish = useCallback(() => {
    Animated.timing(screenOpacityAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onFinish(false);
    });
  }, [screenOpacityAnim, onFinish]);

  useEffect(() => {
    fadeIn();

    if (currentTextIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        fadeOut(() => setCurrentTextIndex((prev) => prev + 1));
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const lastTextDuration = 1500;
      const finishTimer = setTimeout(() => {
        handleFinish();
      }, lastTextDuration);
      return () => clearTimeout(finishTimer);
    }
  }, [currentTextIndex, fadeIn, fadeOut, handleFinish]);

  return (
    <SafeAreaView className="flex-1 bg-white font-Poppins_Regular">
      <Animated.View
        style={{ opacity: screenOpacityAnim }}
        className="items-center justify-end w-full">
        <Image
          source={require('@/assets/images/bg_splash.png')}
          resizeMode="cover"
          className="w-full h-full"
        />
        <ActivityIndicator />
        <Animated.View style={{ opacity: fadeAnim }} className="pb-12">
          <Text className="mt-5 text-lg text-gray-800">{texts[currentTextIndex]}</Text>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;
