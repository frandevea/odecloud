import { View, Image, ImageSourcePropType } from 'react-native';
import { Text } from '@/components/ui/text';

type Props = {
  icon?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
};

export function EmptyContent({
  icon,
  image,
  imageAlt,
  title,
  subtitle,
  description,
  children,
}: Props) {
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
      {children && <View className="w-full space-y-2 mt-14">{children}</View>}
    </View>
  );
}
