import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Animated } from 'react-native';

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
    <View className="items-center justify-end flex-1 pb-12 bg-white font-Poppins_Regular">
      <ActivityIndicator />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text className="mt-5 text-lg text-gray-800 ">{texts[currentTextIndex]}</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;
