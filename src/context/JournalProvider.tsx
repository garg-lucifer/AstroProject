// context/HoroscopeProvider.tsx
import React, { useEffect, useState } from 'react';
import { JournalType, JournalContext } from './JournalContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirstXChars } from '../utils/utility';
import { CHOSEN_ZODIAC, ZODIAC } from '../utils/constants';

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [journals, setJournals] = useState<JournalType[]>([]);
  const [todaysJournal, setTodaysJournal] = useState<JournalType | null>(null);

  useEffect(() => {
    async function fillJournals() {
      const keysList = await AsyncStorage.getAllKeys();
      const journalArray: JournalType[] = [];

      for (let key of keysList) {
        if (key.startsWith(CHOSEN_ZODIAC) || key.startsWith(ZODIAC)) continue;
        const value = await AsyncStorage.getItem(key);
        if (value) {
          try {
            const parsed = JSON.parse(value);
            journalArray.push(parsed);
            if (key === new Date().toDateString()) {
              setTodaysJournal(parsed);
            }
          } catch (e) {
            console.warn(`Failed to parse journal for key ${key}:`, e);
          }
        }
      }

      setJournals(journalArray);
    }

    fillJournals();
  }, []);

  async function upsertJournal(journal: JournalType) {
    let preExistingJournal = journals.find(
      journalItem => journalItem.id === journal.id,
    );

    if (preExistingJournal) {
      const updatedJournal = {
        ...preExistingJournal,
        description: journal.description,
        name: getFirstXChars(journal.description, 20),
      };

      const updatedJournals = journals.map(j =>
        j.id === updatedJournal.id ? updatedJournal : j,
      );

      setJournals(updatedJournals);

      await AsyncStorage.setItem(
        updatedJournal.id.toString(),
        JSON.stringify(updatedJournal),
      );
    } else {
      setJournals(prev => [...prev, journal]);
      await AsyncStorage.setItem(journal.id, JSON.stringify(journal));
    }

    if (journal.date === new Date().toDateString()) {
      setTodaysJournal(journal);
    }
  }

  async function deleteJournal(journalId: string) {
    await AsyncStorage.removeItem(journalId.toString());
    const journalToDelete = journals.find(jrnl => jrnl.id === journalId);
    if (journalToDelete?.date === new Date().toDateString()) {
      setTodaysJournal(null);
    }

    setJournals(prevJournals =>
      prevJournals.filter(j => j.id.toString() !== journalId.toString()),
    );
  }

  return (
    <JournalContext.Provider
      value={{ journals, todaysJournal, upsertJournal, deleteJournal }}
    >
      {children}
    </JournalContext.Provider>
  );
};
