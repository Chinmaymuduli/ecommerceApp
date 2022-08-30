import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from 'app';
import {APIOptsType} from 'src/types/api';
import {APIFunction} from 'types';

export const BASE_URL = `https://chhattisgarh-herbals-api.herokuapp.com/api`;

const GetToken = async (successFunction: APIFunction, params: APIOptsType) => {
  const GET_REFRESH_TOKEN = await AsyncStorage.getItem('REFRESH_TOKEN');

  const getResponse = await post({
    path: 'auth/get-access-token',
    body: JSON.stringify({
      refresh_token: GET_REFRESH_TOKEN,
    }),
  });
  if (getResponse.status === 401) {
    await AsyncStorage.setItem('isLoggedIn', 'false');
    console.log('401 delete');
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('REFRESH_TOKEN');
  }

  await AsyncStorage.setItem('ACCESS_TOKEN', getResponse.ACCESS_TOKEN);
  if (getResponse?.REFRESH_Token) {
    await AsyncStorage.setItem('REFRESH_TOKEN', getResponse?.REFRESH_Token);
  }
  await successFunction(params);
};

export const post: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'POST',
  options = {},
}) => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
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
      console.log('post 401 running');
      return GetToken(post, {
        path,
        body,
        method: 'POST',
        options,
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
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
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
      console.log('i m put 401');
      return GetToken(put, {
        path,
        body,
        method: 'PUT',
        options,
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
}) => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
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
      console.log(' i m remove 401');
      return GetToken(remove, {
        path,
        body,
        method: 'DELETE',
        options,
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
export const GET: APIFunction = async path => {
  const accessToken = await AsyncStorage.getItem('ACCESS_TOKEN');
  try {
    const API_OPTIONS = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    if (response.status === 401) {
      return GetToken(GET, path);
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
export {default as END_POINTS} from './end-points';
export {default as authFetch} from './authFetch';
