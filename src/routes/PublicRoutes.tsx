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
} from 'screens';

export type PublicRoutesType = {
  Login: undefined;
  Register: undefined;
  OnBoarding: undefined;
  ForgotPassword: undefined;
  OtpScreen: {
    email?: string;
  };
  ResetPassword: {
    Email?: string;
    code?: number;
  };
};

export type PublicNavigation = NativeStackNavigationProp<PublicRoutesType>;
const Stack = createNativeStackNavigator<PublicRoutesType>();

const PublicRoutes = ({
  initialRouteName = 'OnBoarding',
}: {
  initialRouteName: keyof PublicRoutesType;
}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
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
