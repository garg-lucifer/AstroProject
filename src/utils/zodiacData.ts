import { ImageSourcePropType } from 'react-native';

export type ZodiacSign =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export const zodiacIcons: Record<ZodiacSign, ImageSourcePropType> = {
  Aries: require('../../assets/zodiac/aries.png'),
  Taurus: require('../../assets/zodiac/taurus.png'),
  Gemini: require('../../assets/zodiac/gemini.png'),
  Cancer: require('../../assets/zodiac/cancer.png'),
  Leo: require('../../assets/zodiac/leo.png'),
  Virgo: require('../../assets/zodiac/virgo.png'),
  Libra: require('../../assets/zodiac/libra.png'),
  Scorpio: require('../../assets/zodiac/scorpio.png'),
  Sagittarius: require('../../assets/zodiac/sagittarius.png'),
  Capricorn: require('../../assets/zodiac/capricorn.png'),
  Aquarius: require('../../assets/zodiac/aquarius.png'),
  Pisces: require('../../assets/zodiac/pisces.png'),
};

export const zodiacNames: ZodiacSign[] = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

export const zodiacData = zodiacNames.map(name => ({
  name,
  icon: zodiacIcons[name],
}));
