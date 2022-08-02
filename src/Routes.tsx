import React, {useEffect, useState} from 'react';
import PrivateRoutes from './routes/PrivateRoutes';
import PublicRoutes from './routes/PublicRoutes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ICONS from './assets/icons';
import CustomDrawer from './components/core/CustomDrawer';
import useAuth from './app/useAuth';
import SplashScreen from './screens/common/SplashScreen';
import useAppLoad from './hooks/useAppLoad';
import AppProvider from './layouts';
import useFCMToken from './hooks/useFCMToken';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useIsMounted from './hooks/useIsMounted';

const Drawer = createDrawerNavigator();
const Routes = () => {
  const {user, loggedIn, setLoggedIn} = useAuth(state => state);
  const [userData, setUserData] = useState<string | null>();
  const isMounted = useIsMounted();
  const getUser = async () => {
    try {
      const newUserData = await AsyncStorage.getItem('isUserEnter');
      isMounted.current && setUserData(newUserData);
    } catch (error) {
      console.log(error);
    }
  };

  useFCMToken();
  useAppLoad();

  const getIdData = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      if (value === 'true') return setLoggedIn(true);
      isMounted.current && setLoggedIn(false);
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    getUser();
    getIdData();
  }, [loggedIn]);

  if (!user) return <SplashScreen />;

  return (
    <AppProvider>
      {loggedIn ? (
        // {user?._id && loggedIn ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              flex: 1,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            },
          }}
          drawerContent={() => {
            return <CustomDrawer />;
          }}>
          <Drawer.Screen
            name="Home"
            component={PrivateRoutes}
            options={{
              drawerIcon: ({color}) => <ICONS.Home size={22} color={color} />,
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      ) : (
        <PublicRoutes initialRouteName={userData ? 'Login' : 'OnBoarding'} />
      )}
    </AppProvider>
  );
};

export default Routes;
