import { useEffect } from 'react';
import { useAuth } from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuthFetch from './useAuthFetch';

export default function useAppLoad() {
  const { setUser, user } = useAuth(state => state);
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('access_token')
        const response = await fetch('https://chhattisgarh-herbals-api.herokuapp.com/api/user/my-account', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const userData = await response.json()
        if (!userData) return setUser({})
        setUser(userData.data)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  return {};
}
