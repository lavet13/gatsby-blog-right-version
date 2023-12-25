/// <reference types="redux-persist" />

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';
import { storage } from './root-reducer';

import {
  persistStore,
  persistReducer,
  PersistConfig,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist?: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['messages'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,

  preloadedState: {},

  enhancers: [reduxBatch],

  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware);

    if (process.env.NODE_ENV !== 'production') {
      return middleware.concat(logger);
    }

    return middleware;
  },

  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
