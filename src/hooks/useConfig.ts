import {useEffect, useState} from 'react';
import {useAuth} from 'app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useIsMounted from './useIsMounted';

import {BASE_URL} from 'api';

import {Alert} from 'react-native';

export default function useAppLoad() {
  const {setUser, user} = useAuth(state => state);
  const isMounted = useIsMounted();

  useEffect(() => {
    (async () => {
      try {
        console.log('config running');
        const response = await fetch(`${BASE_URL}/config`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('status', response);
        const configData = await response.json();
        console.log('data', configData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return {};
}
