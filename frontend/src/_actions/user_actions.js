import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER, FIND_USER_BY_PHOTO } from './types';
import { BACK_SERVER_URL, headersConfig } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  const request = axios
    .post(BACK_SERVER_URL + `api/users/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(BACK_SERVER_URL + `api/users/login`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios
    .get(BACK_SERVER_URL + `api/users/auth`, headersConfig)
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios
    .get(BACK_SERVER_URL + 'api/users/logout', headersConfig)
    .then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function findUserByPhoto(dataToSubmit) {
  const request = axios
    .post(BACK_SERVER_URL + 'api/findsimilar', dataToSubmit)
    .then((response) => response.data);

  return {
    type: FIND_USER_BY_PHOTO,
    payload: request,
  };
}
