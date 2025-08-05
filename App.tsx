import React from 'react';
import { HoroscopeProvider } from './src/context/HoroscopeProvider';
import { Home } from './src/screens/Home';
import { JournalProvider } from './src/context/JournalProvider';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Journal } from './src/screens/Journal';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: Home,
    Journal: Journal,
  },
  screenOptions: {
    headerShown: false,
  },
});

type RootStackParamList = StaticParamList<typeof RootStack>;
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);

const App = () => {
  return (
    <HoroscopeProvider>
      <JournalProvider>
        <Navigation />
      </JournalProvider>
    </HoroscopeProvider>
  );
};

export default App;
