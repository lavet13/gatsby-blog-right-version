import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { reduxBatch } from '@manaflair/redux-batch';

import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,

  enhancers: [reduxBatch],

  middleware: getDefaultMiddleware => {
    const middleware = getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware);

    if (process.env.NODE_ENV !== 'production') {
      return middleware.concat(logger);
    }

    return middleware;
  },

  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
