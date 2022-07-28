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

const Stack = createNativeStackNavigator();
const App = () => {
  // const {setLoggedIn} = useAuth();

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) {
  //     (async () => {
  //       const Refresh_Token = await AsyncStorage.getItem('tokenId');
  //       // console.log(Refresh_Token);
  //       if (Refresh_Token) {
  //         setLoggedIn(true);
  //       }
  //     })();
  //   }
  //   return () => {
  //     mounted = false;
  //   };
  // }, []);

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
