import { useEffect } from 'react';
import { useAuth } from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useAppLoad() {
  const { setUser } = useAuth(state => state);
  useEffect(() => {
    (async () => {
      try {
        const userStr = await AsyncStorage.getItem('user');
        const userJSON = JSON.parse(userStr || `{}`);
        // console.log({ userJSON });
        setTimeout(async () => {
          await setUser(userJSON);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {};
}
