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
import useConfig from './hooks/useConfig';
import useAppContext from './contexts/useAppContext';

const Drawer = createDrawerNavigator();
const Routes = () => {
  const {user, setUser} = useAuth(state => state);
  const {setIsLoggedIn, isLoggedIn} = useAppContext();
  const [userEnter, setUserEnter] = useState<string | null>();
  const isMounted = useIsMounted();
  // const{} = useSwrApi('')
  const {data, isLoading} = useAppLoad();

  console.log({isLoggedIn});

  useFCMToken();
  // useAppLoad();

  useConfig();

  const getUser = async () => {
    try {
      const newUserData = await AsyncStorage.getItem('isUserEnter');
      isMounted.current && setUserEnter(newUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const getIdData = async () => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn');
      // const asGuest = await AsyncStorage.getItem('asGuest');
      console.log('value', value);
      if (value === 'true') {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      // if (value === 'true' && asGuest !== 'true') return setLoggedIn(true);
    } catch (e) {
      console.log('error', e);
    }
  };
  useEffect(() => {
    getUser();
    getIdData();
  }, [isLoggedIn]);

  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn === null || isLoading) return <SplashScreen />;

  return (
    <AppProvider>
      {/* {!isLoading && loggedIn ? ( */}
      {isLoggedIn ? (
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
        <PublicRoutes initialRouteName={userEnter ? 'Login' : 'OnBoarding'} />
      )}
    </AppProvider>
  );
};

export default Routes;
