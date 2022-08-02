import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from 'api';
import {useState} from 'react';
import useSWR from 'swr';
import useIsMounted from './useIsMounted';

const useSwrApi = (url: string, options?: any) => {
  const [isLoading, setLoading] = useState(false);
  const isMounted = useIsMounted();
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
        console.log(getResponseData);
        const res = await fetch(`${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getResponseData?.ACCESS_TOKEN}`,
          },
        });
        console.log(res);
        const data = await res.json();
        console.log(data);
        return {data, res};
      }
      const data = await res.json();
      return {data, res};
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const {data, error, mutate} = useSWR(`${BASE_URL}/${url}`, fetcher, options);

  return {
    data,
    error,
    mutate,
    isLoading,
  };
};
export default useSwrApi;
