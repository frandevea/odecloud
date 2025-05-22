import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Text, View } from '@/components/ui';

const LOADING_TEXTS: string[] = [
  'Heating up notifications...',
  'Whispering to the servers...',
  'Taming the backlog dragons...',
  'Getting your workspace ready...',
  'Brewing some fresh code...',
  'Almost there...',
];

const TEXT_CHANGE_INTERVAL: number = 2500; // ms

// Props should be defined in the top of the component
// No props needed for this static splash screen for now, but good practice to keep.
// type Props = {};

export default function SplashScreenComponent(/*props: Props*/) {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex(
        (prevIndex) => (prevIndex + 1) % LOADING_TEXTS.length
      );
    }, TEXT_CHANGE_INTERVAL);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <LinearGradient
      colors={['#FFD1DC', '#E0B0FF', '#FFFFFF']} // Rosa claro -> Lavanda -> Blanco
      // Ajusta las localizaciones para que el blanco empiece más abajo y sea predominante
      locations={[0, 0.5, 0.8]} // Ejemplo: Rosa 0-50%, Lavanda 50-80%, Blanco 80-100%
      className="flex-1 items-center justify-center p-6"
    >
      <View className="flex-1 items-center justify-center">
        {/* Logo y Nombre de la App */}
        <View className="items-center">
          <Text className="text-4xl font-bold text-white">OdeCloud</Text>
        </View>
      </View>

      {/* Indicador de Carga y Texto Dinámico */}
      <View className="items-center pb-10">
        <ActivityIndicator size="large" color="#8A2BE2" className="mb-4" />
        {/* Color morado para el spinner */}
        <Text className="text-lg text-gray-700">
          {LOADING_TEXTS[currentTextIndex]}
        </Text>
      </View>
    </LinearGradient>
  );
}
