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
      console.log('first run');
      isMounted.current && setLoading(true);
      let getAccessToken = await AsyncStorage.getItem('access_token');
      const getRefreshToken = await AsyncStorage.getItem('tokenId');
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken}`,
        },
      });
      console.log({res});
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
          // console.log(
          //   url === 'user/my-account' &&
          //     'Fetching user get access_token status 401',
          // );
          console.log('not refresh token');
          await AsyncStorage.setItem('isLoggedIn', 'false')
            .then(() => {
              console.log('Logout Success');
              setLoggedIn(false);
            })
            .catch(error => console.log(error));
          await AsyncStorage.removeItem('access_token');
          await AsyncStorage.removeItem('tokenId');
        } else {
          await AsyncStorage.setItem(
            'access_token',
            getResponseData?.ACCESS_TOKEN,
          );
          if (getResponseData?.REFRESH_TOKEN)
            return await AsyncStorage.setItem(
              'tokenId',
              getResponseData?.REFRESH_TOKEN,
            );

          // console.log(url === 'user/my-account' && 'Fetching user data again');
          getAccessToken = await AsyncStorage.getItem('access_token');
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
