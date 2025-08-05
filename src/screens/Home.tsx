import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useHoroscope } from '../hooks/useHoroscope';
import ZodiacDropdown from '../components/ZodiacDropdown';
import { useJournal } from '../hooks/useJournal';
import { JournalItem } from '../components/JournalItem';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const { horoscope, todayDate } = useHoroscope();
  const { journals, todaysJournal, deleteJournal } = useJournal();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Daily Horoscope</Text>

      <View style={styles.row}>
        <ZodiacDropdown />
        <Text style={styles.date}>{todayDate.toDateString()}</Text>
      </View>

      <Text style={styles.horoscope}>{horoscope}</Text>

      {journals.length > 0 && (
        <>
          <Text style={styles.title}>Journals</Text>
          <FlatList
            data={journals}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <JournalItem
                journal={item}
                onDelete={() => {
                  deleteJournal(item.id);
                }}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Journal', {
                    journalDetail: item,
                  });
                }}
              />
            )}
          />
        </>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Journal', {
            journalDetail: todaysJournal,
          });
        }}
      >
        <Text style={styles.fabIcon}>✏️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30, backgroundColor: 'white', flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: { fontSize: 16 },
  picker: { height: 40, width: 160 },
  horoscope: { fontSize: 16, lineHeight: 22 },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 48,
    backgroundColor: 'magenta',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
});
