import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View } from 'react-native';

export const caracteristicsIcons = {
  0: { icon: FontAwesome5, name: 'dog' },
  1: { icon: FontAwesome5, name: 'running' },
  2: { icon: FontAwesome5, name: 'heart' },
  3: { icon: FontAwesome5, name: 'home' },
  4: { icon: FontAwesome5, name: 'bone' },
  5: { icon: FontAwesome5, name: 'paw' },
  6: { icon: FontAwesome5, name: 'star' },
  7: { icon: FontAwesome5, name: 'crown' },
  8: { icon: FontAwesome5, name: 'shield-alt' },
  9: { icon: FontAwesome5, name: 'medal' },
} as const;

// Usage dans dog-item-listing.tsx:
export const getCaracteristicsIcons = (caracteristics: number[]) => {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {caracteristics.map((charId: number) => {
        const iconData = caracteristicsIcons[charId as keyof typeof caracteristicsIcons];
        if (!iconData) return null;

        return <FontAwesome5 key={charId} name={iconData.name} size={14} color="white" />;
      })}
    </View>
  );
};
