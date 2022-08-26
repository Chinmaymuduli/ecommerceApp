import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from 'api';
import {useCallback, useEffect, useState} from 'react';
import useIsMounted from './useIsMounted';
export default ({url, method, body, isFormData}: fetchURLProps) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [data, setData] = useState<any>(undefined);
  const isMounted = useIsMounted();
  const API_ENDPOINT = BASE_URL;
  const fetchURL = useCallback(
    async ({url, method, body, isFormData}: fetchURLProps) => {
      try {
        isMounted.current && setLoading(true);
        const ACCESS_TOKEN = await AsyncStorage.getItem('ACCESS_TOKEN');
        //   const ACCESS_TOKEN = await AsyncStorage.getItem("ACCESS_TOKEN");
        const REFRESH_TOKEN = await AsyncStorage.getItem('REFRESH_TOKEN');
        //   const REFRESH_TOKEN = await AsyncStorage.getItem("REFRESH_TOKEN");
        const options: RequestInit = {
          method: method || 'GET',
          headers: {
            'Content-Type': isFormData
              ? 'multipart/form-data'
              : 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
          body: isFormData ? body : JSON.stringify(body),
        };
        !body && delete options?.body;
        const response = await fetch(API_ENDPOINT + url, options);
        console.log('Main Data Fetching');
        if (response?.status === 401) {
          console.log('Expire Data Fetching');
          const getAccessTokenRes = await fetch(
            API_ENDPOINT + '/get-access-token',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({refresh_token: REFRESH_TOKEN}),
            },
          );
          if (getAccessTokenRes.status === 401) {
            console.log('logout data');
            await AsyncStorage.removeItem('ACCESS_TOKEN');
            await AsyncStorage.removeItem('REFRESH_TOKEN');
            return;
          }
          const getAccessTokenResData = await getAccessTokenRes.json();
          getAccessTokenResData?.ACCESS_TOKEN &&
            (await AsyncStorage.setItem(
              'ACCESS_TOKEN',
              getAccessTokenResData?.ACCESS_TOKEN,
            ));
          getAccessTokenResData?.REFRESH_TOKEN &&
            (await AsyncStorage.setItem(
              'REFRESH_TOKEN',
              getAccessTokenResData?.REFRESH_TOKEN,
            ));
          console.log('Refetching data');
          isMounted.current &&
            (await fetchURL({url, method, body, isFormData}));
        }
        const responseData = await response.json();
        isMounted.current && setData(responseData);
        return responseData;
      } catch (error) {
        const err = error as Error;
        isMounted.current && setError(err.message);
      } finally {
        isMounted.current && setLoading(false);
      }
    },
    [],
  );
  const mutate = async () => {
    isMounted.current && (await fetchURL({url, method, body, isFormData}));
  };
  useEffect(() => {
    if (isMounted.current && url) {
      fetchURL({url, method, body, isFormData});
    }
  }, [url, method, body, isFormData, fetchURL]);
  return {fetchURL, isLoading, error, data, mutate};
};

export interface fetchURLProps {
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit_;
  isFormData?: boolean;
}
