import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';

interface ZodiacItemProps {
  name: string;
  icon: ImageSourcePropType;
  onPress?: () => void;
}

const ZodiacItem = ({ name, icon, onPress }: ZodiacItemProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={icon} style={styles.image} resizeMode="contain" />
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  image: {
    width: 32,
    height: 32,
  },
  text: {
    fontSize: 16,
  },
});

export default ZodiacItem;
