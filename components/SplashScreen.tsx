import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Animated } from 'react-native';

interface SplashScreenProps {
  onFinish: (isCancelled: boolean) => void;
}

const texts = [
  'Cargando recursos...',
  'Preparando la interfaz...',
  'Casi listo...',
  '¡Bienvenido!',
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
      }, 2000); // Change text every 2 seconds + 0.5s fadeOut
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinish(false);
      }, 2500); // Show last text for 2.5s then finish
      return () => clearTimeout(finishTimer);
    }
  }, [currentTextIndex, fadeAnim, onFinish]);

  // Fallback for Animated if not available (e.g. web)
  // This simple version does not have animations.
  // For animations on web, you'd typically use CSS transitions or a web animation library.
  /*
  useEffect(() => {
    if (currentTextIndex < texts.length - 1) {
      const timer = setTimeout(() => {
        setCurrentTextIndex(currentTextIndex + 1);
      }, 1500); // Change text every 1.5 seconds
      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        onFinish(false);
      }, 1500); // Show last text for 1.5s then finish
      return () => clearTimeout(finishTimer);
    }
  }, [currentTextIndex, onFinish]);
  */

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.text}>{texts[currentTextIndex]}</Text>
      </Animated.View>
      {/* Fallback text display if Animated is not used:
      <Text style={styles.text}>{texts[currentTextIndex]}</Text>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default SplashScreen;
