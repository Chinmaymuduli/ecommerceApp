import {useEffect, useState} from 'react';
import {useAuth} from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useIsMounted from './useIsMounted';

export default function useAppLoad() {
  const {setUser, user} = useAuth(state => state);
  const [tokenId, setTokenID] = useState<string | null>();
  const isMounted = useIsMounted();
  const getToken = async () => {
    const token = await AsyncStorage.getItem('access_token');
    setTokenID(token);
  };
  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        console.log('i m running');
        const response = await fetch(
          'https://chhattisgarh-herbals-api.herokuapp.com/api/user/my-account',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenId}`,
            },
          },
        );
        console.log({responseAppLoad: response});
        const userData = await response.json();

        isMounted.current && setUser(userData.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [tokenId]);

  return {};
}
