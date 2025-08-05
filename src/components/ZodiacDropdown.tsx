import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import ZodiacItem from './ZodiacItem';
import { zodiacData } from '../utils/zodiacData';
import { useHoroscope } from '../hooks/useHoroscope';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ZodiacDropdown = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedZodiac, setSelectedZodiac } = useHoroscope();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chip} onPress={() => setIsExpanded(true)}>
        <Text style={styles.chipText}>{selectedZodiac}</Text>
      </TouchableOpacity>

      <Modal
        visible={isExpanded}
        transparent
        animationType="fade"
        onRequestClose={() => setIsExpanded(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsExpanded(false)}>
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.dropdown}>
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
                >
                  {zodiacData.map(item => (
                    <ZodiacItem
                      key={item.name}
                      name={item.name}
                      icon={item.icon}
                      onPress={() => {
                        setSelectedZodiac(item.name);
                        setIsExpanded(false);
                      }}
                    />
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 16,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 100,
    paddingLeft: 20,
  },
  dropdown: {
    width: SCREEN_WIDTH * 0.6,
    backgroundColor: 'white',
    borderRadius: 8,
    maxHeight: 250,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingVertical: 4,
  },
});

export default ZodiacDropdown;
