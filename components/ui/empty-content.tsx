import { View, Image, Linking, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useRouter } from 'expo-router';
import { ArrowRight } from '@/lib/icons/ArrowRight';

type Props = {
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

export function EmptyContent({
  icon,
  image,
  imageAlt,
  title,
  subtitle,
  description,
  buttonText,
  buttonHref,
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (!buttonHref) return;
    if (buttonHref.startsWith('http')) {
      Linking.openURL(buttonHref);
    } else {
      router.push(buttonHref);
    }
  };

  return (
    <View className="items-center justify-center flex-1 w-full p-6 px-8 pb-32 space-y-4">
      {icon && <View className="p-4">{icon}</View>}
      {image && (
        <Image
          source={image as ImageSourcePropType}
          accessibilityLabel={imageAlt}
          className="w-10 h-10 mb-2 rounded-md"
          resizeMode="contain"
        />
      )}

      {title && <Text className="text-2xl font-semibold text-center text-foreground">{title}</Text>}
      {subtitle && (
        <Text className="text-lg font-medium text-center text-foreground">{subtitle}</Text>
      )}
      {description && (
        <Text className="max-w-xs text-base text-center text-muted-foreground">{description}</Text>
      )}

      {buttonText && buttonHref && (
        <View className="w-full mt-14">
          <Button variant="action" onPress={handlePress}>
            <View className="flex-row items-center gap-1">
              <Text className="flex-row items-center text-primary-foreground">{buttonText}</Text>
              <ArrowRight className="text-white" size={16} />
            </View>
          </Button>
        </View>
      )}
    </View>
  );
}
