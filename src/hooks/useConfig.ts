import {useEffect, useState} from 'react';
import {useAuth} from 'app';
import useIsMounted from './useIsMounted';
import {BASE_URL} from 'api';

type CONFIG_TYPE = {
  data: {
    GST?: number;
    androidApp?: {
      isDismissible: boolean;
      message: string;
      title: string;
      version: number;
    };
  };
};

export default function useAppLoad() {
  const {setUser, user} = useAuth(state => state);
  const isMounted = useIsMounted();
  const [configData, setConfigData] = useState<CONFIG_TYPE>();
  const [isConfigLoading, setIsConfigLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log('config running');
        isMounted.current && setIsConfigLoading(true);
        const response = await fetch(`${BASE_URL}/config`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('status', response);
        const data = await response.json();
        isMounted.current && setConfigData(data);
      } catch (error) {
        console.log(error);
      } finally {
        isMounted.current && setIsConfigLoading(false);
      }
    })();
  }, []);

  return {configData, isConfigLoading};
}
