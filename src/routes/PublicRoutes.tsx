import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {
  ForgotPassword,
  Login,
  OnBoarding,
  OtpScreen,
  Register,
  ResetPassword,
  SplashScreen,
} from 'screens';

export type PublicRoutesType = {
  Login: undefined;
  Register: undefined;
  OnBoarding: undefined;
  SplashScreen: undefined;
  ForgotPassword: undefined;
  OtpScreen: undefined;
  ResetPassword: undefined;
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
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default PublicRoutes;
