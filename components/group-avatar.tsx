import { View } from 'react-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

interface GroupAvatarProps {
  avatars: { uri?: string; initials: string }[];
}

export function GroupAvatar({ avatars }: GroupAvatarProps) {
  const size = 49;
  const cellSize = size / 1.5;
  const overlap = cellSize * 0.35;

  const count = Math.min(avatars.length, 4);

  const trianglePositions = [
    { top: 0, left: 0, zIndex: 1 },
    { top: 0, left: cellSize - overlap, zIndex: 2 },
    { top: cellSize - overlap / 1, left: cellSize / 1.5 - cellSize / 2.5, zIndex: 3 },
  ];

  const squarePositions = [
    { top: 0, left: 0, zIndex: 3 },
    { top: 0, left: cellSize - overlap, zIndex: 2 },
    { top: cellSize - overlap, left: 0, zIndex: 1 },
    { top: cellSize - overlap, left: cellSize - overlap, zIndex: 2.5 },
  ];

  const positions = count === 3 ? trianglePositions : squarePositions;

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: size,
          height: size,
          position: 'relative',
          transform: [{ scale: 0.92 }],
        }}>
        {avatars.slice(0, 4).map((item, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              ...positions[index],
              width: cellSize,
              height: cellSize,
              borderRadius: cellSize / 2,
              borderWidth: 2,
              borderColor: '#fff',
              overflow: 'hidden',
            }}>
            <Avatar
              alt={`Avatar ${item.initials}`}
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#e0e0e0',
              }}>
              {item.uri && item.uri.trim() !== '' ? (
                <AvatarImage source={{ uri: item.uri }} />
              ) : (
                <AvatarFallback>
                  <Text className="text-xs font-semibold text-muted-foreground">
                    {item.initials}
                  </Text>
                </AvatarFallback>
              )}
            </Avatar>
          </View>
        ))}
      </View>
    </View>
  );
}
