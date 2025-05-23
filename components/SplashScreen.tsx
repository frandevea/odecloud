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
  const [fadeAnim] = useState(new Animated.Value(0)); // For text fade in/out
  const [screenOverallOpacityAnim] = useState(new Animated.Value(1)); // For overall screen fade out

  useEffect(() => {
    // Fade in current text
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (currentTextIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        // Fade out current text
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setCurrentTextIndex(currentTextIndex + 1);
          // Next text will fade in due to useEffect re-triggering
        });
      }, 1500); // Duration text is visible + fade out duration for current text
      return () => clearTimeout(timer);
    } else {
      // Last text is visible
      const lastTextVisibilityDuration = 1500; // How long the last text stays fully visible
      const screenFadeOutDuration = 500; // How long the entire screen fade-out takes

      const finishTimer = setTimeout(() => {
        // Start fading out the entire screen content
        Animated.timing(screenOverallOpacityAnim, {
          toValue: 0,
          duration: screenFadeOutDuration,
          useNativeDriver: true,
        }).start(() => {
          onFinish(false); // Call onFinish after the screen has faded out
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
