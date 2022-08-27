import {useEffect, useState} from 'react';
import {useAuth} from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useIsMounted from './useIsMounted';

import {BASE_URL} from 'api';

import {Alert} from 'react-native';
import {User} from 'types';

export default function useAppLoad() {
  const {setUser, user} = useAuth(state => state);
  const isMounted = useIsMounted();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<User | undefined>(undefined);

  useEffect(() => {
    (async () => {
      console.log('useappload running');
      try {
        console.log('Running App');
        setIsLoading(true);
        const Access_token = await AsyncStorage.getItem('ACCESS_TOKEN');
        const response = await fetch(
          'https://chhattisgarh-herbals-api.herokuapp.com/api/user/my-account',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Access_token}`,
            },
          },
        );
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
            Alert.alert('Error', 'Logout');
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
              isMounted.current && setData(data?.data);
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
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return {isLoading, data};
}
