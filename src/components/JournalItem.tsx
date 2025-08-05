import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { JournalType } from '../context/JournalContext';

interface JournalItemProps {
  journal: JournalType;
  onDelete: (id: string) => void;
  onPress?: (journal: JournalType) => void;
}

export const JournalItem = ({
  journal,
  onDelete,
  onPress,
}: JournalItemProps) => {
  const formattedDate = new Date(journal.date).toLocaleDateString();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress?.(journal)}
      activeOpacity={0.8}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{journal.name}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {journal.description}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onDelete(journal.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f4f4f4',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
