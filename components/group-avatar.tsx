import { View, Image } from 'react-native';

interface GroupAvatarProps {
  avatarUrls: string[]; // hasta 4 imágenes
  size?: number;
}

export function GroupAvatar({ avatarUrls, size = 40 }: GroupAvatarProps) {
  const count = Math.min(avatarUrls.length, 4);
  const containerStyle = {
    width: size,
    height: size,
  };

  const imageStyle = {
    width: size / 2,
    height: size / 2,
    borderRadius: size / 4,
  };

  return (
    <View style={[containerStyle, { flexWrap: 'wrap', flexDirection: 'row', overflow: 'hidden' }]}>
      {avatarUrls.slice(0, 4).map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={[imageStyle, { margin: 1, backgroundColor: '#ccc' }]}
        />
      ))}
    </View>
  );
}
