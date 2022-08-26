import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from 'api';
import {useAuth} from 'app';
import {useState} from 'react';
import useSWR from 'swr';
import useIsMounted from './useIsMounted';

const useSwrApi = (url: string, options?: any) => {
  const [isLoading, setLoading] = useState(false);
  const isMounted = useIsMounted();
  const {setLoggedIn} = useAuth();
  const fetcher = async (url: string, options?: any) => {
    try {
      isMounted.current && setLoading(true);
      let getAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const getRefreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      });
      if (res?.status === 401) {
        console.log('i am running');
        const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: getRefreshToken,
          }),
        });
        console.log('reFetch', getResponse);
        const getResponseData = await getResponse.json();

        if (getResponse.status === 401) {
          console.log('not refresh token');
          await AsyncStorage.setItem('isLoggedIn', 'false')
            .then(() => {
              console.log('Logout Success');
              setLoggedIn(false);
            })
            .catch(error => console.log(error));
          await AsyncStorage.removeItem('ACCESS_TOKEN');
          await AsyncStorage.removeItem('REFRESH_TOKEN');
        } else {
          await AsyncStorage.setItem(
            'ACCESS_TOKEN',
            getResponseData?.ACCESS_TOKEN,
          );
          if (getResponseData?.REFRESH_TOKEN)
            return await AsyncStorage.setItem(
              'REFRESH_TOKEN',
              getResponseData?.REFRESH_TOKEN,
            );

          // console.log(url === 'user/my-account' && 'Fetching user data again');
          getAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
          const refetchResponse = await fetch(`${url}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${getAccessToken}`,
            },
          });

          const data = await refetchResponse.json();
          // console.log(url === 'user/my-account' && 'ReFetching user data done');
          return {data, res};
        }
      }

      const data = await res.json();

      return {data, res};
    } catch (error) {
      console.log(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  };

  const {data, error, mutate, isValidating} = useSWR(
    `${BASE_URL}/${url}`,
    fetcher,
    options,
  );

  return {
    data,
    error,
    mutate,
    isLoading,
    isValidating,
  };
};
export default useSwrApi;
