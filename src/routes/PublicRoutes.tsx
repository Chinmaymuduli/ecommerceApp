import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {Login, OnBoarding, Register, SplashScreen} from 'screens';

export type PublicRoutesType = {
  Login: undefined;
  Register: undefined;
  OnBoarding: undefined;
  SplashScreen: undefined;
};

export type PublicNavigation = NativeStackNavigationProp<PublicRoutesType>;
const Stack = createNativeStackNavigator<PublicRoutesType>();

const PublicRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
