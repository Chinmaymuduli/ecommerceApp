import { APIFunction } from 'types';

export const BASE_URL = `https://studyinrussia.vercel.app/api`;
export const AGORA_API = `https://study-in-russia-api.herokuapp.com`;

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
      data: json?.success?.data,
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
