import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccessToken } from 'hooks';
import { APIOptsType } from 'src/types/api';
import { APIFunction } from 'types';

export const BASE_URL = `https://chhattisgarh-herbals-api.herokuapp.com/api`;

const GetToken = async (successFunction: APIFunction, params: APIOptsType) => {
  const { setAccessToken } = useAccessToken()
  const GET_REFRESH_TOKEN = await AsyncStorage.getItem('tokenId')
  const getResponse = await post({
    path: "auth/get-access-token",
    body: JSON.stringify({
      refresh_token: GET_REFRESH_TOKEN
    })
  })
  if (getResponse.status === 200) {
    setAccessToken(getResponse.ACCESS_TOKEN)
    if (getResponse?.REFRESH_Token) {
      await AsyncStorage.setItem('tokenId', getResponse?.REFRESH_Token)
    }
    successFunction(params)
  }
  if (getResponse.status === 401) {
    console.log("logout")
  }
}

export const post: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'POST',
  options = {},
  headers = { 'Content-Type': 'application/json' },
  token = '',
}) => {
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const API_OPTIONS = {
      method,
      headers,
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
        headers: { 'Content-Type': 'application/json' },
        token: '',
      })
    }
    const json = await response.json();

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return { error };
  }
};
export const put: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'PUT',
  options = {},
  headers = { 'Content-Type': 'application/json' },
  token = '',
}) => {
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
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
    return { error };
  }
};
export const remove: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'DELETE',
  options = {},
  headers = { 'Content-Type': 'application/json' },
  token = '',
}) => {
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    };
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS);
    const json = await response.json();

    return {
      ...json,
      data: json?.success?.data,
      status: response.status,
      error: json?.error,
    };
  } catch (error: any) {
    return { error };
  }
};

export { default as END_POINTS } from './end-points';
function fsx(fsx: any) {
  throw new Error('Function not implemented.');
}

