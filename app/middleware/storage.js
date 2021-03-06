import React from 'react';
import { Base } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
let USER_AUTH = Base.USER_AUTH
let USER_TOKEN = Base.USER_TOKEN
export const setUserToken = async (token) => {
  deleteToken();
  await AsyncStorage.setItem(USER_TOKEN, token, (err) => {
    if (err) {
      throw err;
    }
  });
};

export const getUserToken = async () => {
  const value = await AsyncStorage.getItem(USER_TOKEN);
  if (value !== null) {
    return value;
  }
  return '';
};

export const setUserAuth = async (auth) => {
  deleteAuth();
  await AsyncStorage.setItem(USER_AUTH, JSON.stringify(auth), (err) => {
    if (err) {
      throw err;
    }
  });
};

export const getUserAuth = async () => {
  const value = await AsyncStorage.getItem(USER_AUTH);
  if (value !== null) {
    return JSON.parse(value);
  }
  return '';
};



export const deleteAuth = async () => {
  await AsyncStorage.removeItem(USER_AUTH);
};


export const deleteToken = async () => {
  await AsyncStorage.removeItem(USER_TOKEN);
};

export const set = async (key, value) => {
  await AsyncStorage.setItem(key, value, (err) => {
    if (err) {
      throw err;
    }
  });
};

export const setObject = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value), (err) => {
    if (err) {
      throw err;
    }
  });
};

export const get = async (key) => {
  return await AsyncStorage.getItem(key);
};

export const getObject = async (key) => {
  const value = await AsyncStorage.getItem(key);
  if (value !== null) {
    return JSON.parse(value);
  }
  return '';
};

export const remove = async (key) => {
  await AsyncStorage.removeItem(key);
};
