import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, post} from 'api';
import {useAuth} from 'app';
import {APIOptsType} from 'src/types/api';
import {APIFunction} from 'types';

export const GetToken = async (
  successFunction: APIFunction,
  params: APIOptsType,
) => {
  const {setLoggedIn} = useAuth();
  console.log('user fetching');

  const GET_REFRESH_TOKEN = await AsyncStorage.getItem('tokenId');

  const getResponse = await post({
    path: 'auth/get-access-token',
    body: JSON.stringify({
      refresh_token: GET_REFRESH_TOKEN,
    }),
  });
  if (getResponse.status === 200) {
    await AsyncStorage.setItem('access_token', getResponse?.ACCESS_TOKEN);
    if (getResponse.REFRESH_Token) {
      await AsyncStorage.setItem('tokenId', getResponse?.REFRESH_Token);
    }
    successFunction(params);
  }
  if (getResponse.status === 401) {
    console.log('token expired logout');
    await AsyncStorage.setItem('isLoggedIn', 'false')
      .then(() => {
        console.log('Logout Success');
        setLoggedIn(false);
      })
      .catch(error => console.log(error));
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('tokenId');
  }
};
const authFetch: APIFunction = ({path, body, method, token}) =>
  new Promise(async (resolve, reject) => {
    try {
      const API_OPTIONS = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      };
      !API_OPTIONS.body && delete API_OPTIONS.body;
      const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
      if (response.status === 401) {
        console.log('token fetching');
        return GetToken(authFetch, {
          path,
          body,
          method: 'POST',
          options: {},
        });
      }
      const json = await response.json();
      //   console.log({json});

      resolve({
        ...json,
        data: json?.data,
        status: response.status,
        error: json?.error,
      });
    } catch (error: any) {
      reject(error);
    }
  });

export default authFetch;
