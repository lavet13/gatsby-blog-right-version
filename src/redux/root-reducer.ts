import { combineReducers } from '@reduxjs/toolkit';

import messageSlice from './features/message/message.slice';
import rolesSlice from './features/role/role.slice';
import meSlice from './features/me/me.slice';
import { persistReducer } from 'redux-persist';

import createWebStorage from 'redux-persist/es/storage/createWebStorage';

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

export const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

export const rootReducer = combineReducers({
  messages: messageSlice,
  roles: rolesSlice,
  me: persistReducer(userPersistConfig, meSlice),
});
