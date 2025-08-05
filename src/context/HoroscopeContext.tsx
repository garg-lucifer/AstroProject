// context/HoroscopeContext.ts
import { createContext } from 'react';
import { ZodiacSign } from '../utils/zodiacData';

interface HoroscopeContextType {
  todayDate: Date;
  selectedZodiac: ZodiacSign;
  setSelectedZodiac: (sign: ZodiacSign) => void;
  horoscope: string;
}

export const HoroscopeContext = createContext<HoroscopeContextType | null>(
  null,
);
