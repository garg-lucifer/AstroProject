import { createContext } from 'react';

export interface JournalType {
  id: string;
  name: string;
  date: string;
  description: string;
}

interface JournalContextType {
  journals: JournalType[];
  todaysJournal: JournalType | null;
  upsertJournal: (journal: JournalType) => void;
  deleteJournal: (id: string) => void;
}

export const JournalContext = createContext<JournalContextType | null>(null);
