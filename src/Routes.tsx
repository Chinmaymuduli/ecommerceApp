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
import {BASE_URL} from 'api';
import {Alert} from 'react-native';

const Drawer = createDrawerNavigator();
const Routes = () => {
  const {user, setUser} = useAuth(state => state);
  const {setIsLoggedIn, isLoggedIn} = useAppContext();
  const [userEnter, setUserEnter] = useState<string | null>();
  const isMounted = useIsMounted();
  // const{} = useSwrApi('')
  const {data, isLoading} = useAppLoad();

  console.log({data});

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

  const getUserData = async () => {
    try {
      console.log('Running grt user');

      const Access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
      const response = await fetch(`${BASE_URL}/user/my-account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Access_token}`,
        },
      });
      console.log('status', response?.status);
      if (response?.status === 401) {
        console.log('Running App 401');
        const Refresh_Token = await AsyncStorage.getItem('REFRESH_TOKEN');
        const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: Refresh_Token,
          }),
        });
        if (getResponse.status === 401) {
          await AsyncStorage.removeItem('ACCESS_TOKEN');
          await AsyncStorage.removeItem('REFRESH_TOKEN');
          await AsyncStorage.setItem('isLoggedIn', 'false');
          return;
        }
        const getResponseData = await getResponse.json();
        console.log('getResponseData', getResponseData);
        await AsyncStorage.setItem(
          'ACCESS_TOKEN',
          getResponseData?.ACCESS_TOKEN,
        );
        getResponseData?.REFRESH_TOKEN &&
          (await AsyncStorage.setItem(
            'ACCESS_TOKEN',
            getResponseData?.REFRESH_TOKEN,
          ));
        if (getResponse?.status === 200) {
          const getDataAgain = await fetch(`${BASE_URL}/user/my-account`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getResponseData?.ACCESS_TOKEN}`,
            },
          });
          if (getDataAgain?.status === 200) {
            const data = await getDataAgain.json();
            isMounted.current && setUser(data?.data);
          } else {
            Alert.alert('Error', 'Logout');
          }
        }
      }
      const userData = await response.json();
      isMounted.current && setUser(userData.data);
      if (!userData) return isMounted.current && setUser({});
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getIdData();
    getUserData();
  }, [isLoggedIn]);

  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn === null || isLoading) return <SplashScreen />;

  return (
    <AppProvider>
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
