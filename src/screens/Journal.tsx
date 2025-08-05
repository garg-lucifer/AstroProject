import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { JournalType } from '../context/JournalContext';
import { useJournal } from '../hooks/useJournal';
import { getFirstXChars } from '../utils/utility';

type RootStackParamList = {
  Journal: { journalDetail?: JournalType };
};

type JournalRouteProp = RouteProp<RootStackParamList, 'Journal'>;

export const Journal = () => {
  const route = useRoute<JournalRouteProp>();
  const journalDetail = route.params?.journalDetail;
  const isNewJournal = !journalDetail;

  const { upsertJournal } = useJournal();
  const navigation = useNavigation();

  const [text, setText] = useState(journalDetail?.description ?? '');

  const handleSave = () => {
    if (!text.trim()) {
      Alert.alert('Cannot save empty journal.');
      return;
    }

    const newJournal: JournalType = {
      id: isNewJournal ? new Date().toDateString() : journalDetail.id,
      description: text,
      name: getFirstXChars(text, 20),
      date: isNewJournal ? new Date().toDateString() : journalDetail.date,
    };

    upsertJournal(newJournal);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Journal</Text>
      <TextInput
        style={styles.input}
        placeholder="Write something..."
        value={text}
        placeholderTextColor={'grey'}
        onChangeText={setText}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
