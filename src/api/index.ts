import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from 'app';
import {APIOptsType} from 'src/types/api';
import {APIFunction} from 'types';

export const BASE_URL = `https://chhattisgarh-herbals-api.herokuapp.com/api`;

const GetToken = async (successFunction: APIFunction, params: APIOptsType) => {
  const GET_REFRESH_TOKEN = await AsyncStorage.getItem('tokenId');
  const {setLoggedIn} = useAuth();
  const getResponse = await post({
    path: 'auth/get-access-token',
    body: JSON.stringify({
      refresh_token: GET_REFRESH_TOKEN,
    }),
  });

  // console.log('first50', getResponse);
  if (getResponse.status === 401)
    return await AsyncStorage.setItem('isLoggedIn', 'false')
      .then(() => {
        console.log('Logout Success');
        setLoggedIn(false);
      })
      .catch(error => console.log(error));
  if (getResponse.status !== 200) return;
  await AsyncStorage.setItem('access_token', getResponse.ACCESS_TOKEN);
  if (!getResponse?.REFRESH_Token) return;
  await AsyncStorage.setItem('tokenId', getResponse?.REFRESH_Token);
  await successFunction(params);
};

export const post: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'POST',
  options = {},
  headers = {'Content-Type': 'application/json'},
  token = '',
}) => {
  // if (token) headers.Authorization = `Bearer ${token}`;
  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const API_OPTIONS = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    if (response.status === 401) {
      return GetToken(post, {
        path,
        body: JSON.stringify({}),
        method: 'POST',
        options: {},
        headers: {'Content-Type': 'application/json'},
        token: '',
      });
    }
    const json = await response.json();

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return {error};
  }
};
export const put: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'PUT',
  options = {},
}) => {
  const accessToken = await AsyncStorage.getItem('access_token');
  // if (token) headers.Authorization = `Bearer ${token || accessToken}`;
  // if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const API_OPTIONS = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    console.log(response.status);
    if (response.status === 401) {
      return GetToken(put, {
        path,
        body: JSON.stringify({}),
        method: 'PUT',
      });
    }
    const json = await response.json();

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return {error};
  }
};
export const remove: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'DELETE',
  options = {},
  // headers = {'Content-Type': 'application/json'},
  token = '',
}) => {
  // if (token) headers.Authorization = `Bearer ${token}`;
  const accessToken = await AsyncStorage.getItem('access_token');
  try {
    const API_OPTIONS = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    if (response.status === 401) {
      return GetToken(remove, {
        path,
        body: JSON.stringify({}),
        method: 'DELETE',
        options: {},
        headers: {'Content-Type': 'application/json'},
        // token: '',
      });
    }
    const json = await response.json();

    return {
      ...json,
      data: json?.success?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return {error};
  }
};
export const GET: APIFunction = async ({
  path,
  method = 'GET',
  options = {},
  headers = {'Content-Type': 'application/json'},
  token = '',
}) => {
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const API_OPTIONS = {
      method,
      headers,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    const json = await response.json();

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return {error};
  }
};
export {default as END_POINTS} from './end-points';
export {default as authFetch} from './authFetch';

function fsx(fsx: any) {
  throw new Error('Function not implemented.');
}
