import {useCallback, useEffect, useState} from 'react';
import useIsMounted from './useIsMounted';
import {authFetch} from 'api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiAuthType} from 'types';

const useAuthFetch = <T>(props: ApiAuthType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<T>();
  const [error, setError] = useState<string>();
  const isMounted = useIsMounted();
  const fetchData = useCallback(async ({method, path, body}: ApiAuthType) => {
    try {
      isMounted.current && setIsLoading(true);
      const getAccessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
      const response = await authFetch({
        path,
        method,
        body,
        token: getAccessToken,
      });
      // console.log("response", response)
      isMounted.current && setAuthData(response.data);
    } catch (err) {
      const error = err as Error;
      console.log(error);
      setError(error.message);
    } finally {
      isMounted.current && setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    if (props?.path && props?.method) {
      fetchData({
        method: props.method,
        path: props.path,
        body: props.body,
      });
    }
  }, []);
  return {authData, isLoading, error, fetchData};
};

export default useAuthFetch;
