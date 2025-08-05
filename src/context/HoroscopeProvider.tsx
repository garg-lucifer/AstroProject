// context/HoroscopeProvider.tsx
import React, { useEffect, useRef, useState } from 'react';
import { ZodiacSign, zodiacNames } from '../utils/zodiacData';
import { HoroscopeContext } from './HoroscopeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHOSEN_ZODIAC, ZODIAC } from '../utils/constants';

export const HoroscopeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign>(
    zodiacNames[0],
  );
  const todayDate = useRef<Date>(new Date());
  const [horoscope, setHoroscope] = useState<string>('');

  async function fetchHoroscope(sign: string): Promise<void> {
    const key = `${ZODIAC}-${sign}-${todayDate.current.toDateString()}`;

    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue !== null) {
        setHoroscope(storedValue);
        return;
      }

      const resp = await fetch(
        `https://api.api-ninjas.com/v1/horoscope?zodiac=${sign.toLowerCase()}`,
      );
      if (!resp.ok) throw new Error('API error');
      const data = await resp.json();
      setHoroscope(data.horoscope);
      AsyncStorage.setItem(key, data.horoscope);
    } catch (err) {
      console.error('Failed to fetch horoscope:', err);
      setHoroscope('Failed to load horoscope.');
    }
  }

  async function selectZodiac(zodiac: ZodiacSign) {
    setSelectedZodiac(zodiac);
    AsyncStorage.setItem(CHOSEN_ZODIAC, zodiac);
  }

  useEffect(() => {
    const fetchZodiac = async () => {
      try {
        const storedZodiac = await AsyncStorage.getItem(CHOSEN_ZODIAC);
        if (storedZodiac) {
          setSelectedZodiac(storedZodiac as ZodiacSign);
        }
      } catch (error) {
        console.error('Failed to load zodiac from storage', error);
      }
    };

    fetchZodiac();
  }, []);

  useEffect(() => {
    fetchHoroscope(selectedZodiac);
  }, [selectedZodiac]);

  return (
    <HoroscopeContext.Provider
      value={{
        todayDate: todayDate.current,
        selectedZodiac,
        setSelectedZodiac: selectZodiac,
        horoscope,
      }}
    >
      {children}
    </HoroscopeContext.Provider>
  );
};
