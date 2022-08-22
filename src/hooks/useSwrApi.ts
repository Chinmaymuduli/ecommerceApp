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
      const getAccessToken = await AsyncStorage.getItem('access_token');
      const getRefreshToken = await AsyncStorage.getItem('tokenId');

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      });

      if (res?.status === 401) {
        const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refresh_token: getRefreshToken,
          }),
        });
        const getResponseData = await getResponse.json();

        await AsyncStorage.setItem(
          'access_token',
          getResponseData?.ACCESS_TOKEN,
        );
        if (getResponse.status === 401)
          return await AsyncStorage.setItem('isLoggedIn', 'false')
            .then(() => {
              console.log('Logout Success');
              setLoggedIn(false);
            })
            .catch(error => console.log(error));
        if (getResponseData?.REFRESH_TOKEN)
          return await AsyncStorage.setItem(
            'tokenId',
            getResponseData?.REFRESH_TOKEN,
          );

        const res = await fetch(`${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAccessToken}`,
          },
        });

        const data = await res.json();

        return {data, res};
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
