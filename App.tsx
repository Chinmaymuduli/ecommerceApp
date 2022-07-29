/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import Routes from './src/Routes';
import {NavigationContainer} from '@react-navigation/native';
import CustomTheme from 'styles';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppContextProvider from './src/contexts/AppContextProvider';
import {useAuth} from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from 'api';
import useSWR from 'swr';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider
        theme={CustomTheme}
        config={{
          dependencies: {
            'linear-gradient': require('react-native-linear-gradient').default,
          },
        }}>
        <AppContextProvider>
          <Routes />
        </AppContextProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
