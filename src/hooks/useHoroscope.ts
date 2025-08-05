// context/useHoroscope.ts
import { useContext } from 'react';
import { HoroscopeContext } from '../context/HoroscopeContext';

export const useHoroscope = () => {
  const context = useContext(HoroscopeContext);
  if (!context) {
    throw new Error('useHoroscope must be used within a HoroscopeProvider');
  }
  return context;
};
