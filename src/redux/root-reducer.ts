import { combineReducers } from '@reduxjs/toolkit';

import messageSlice from './features/message/message.slice';

export const rootReducer = combineReducers({
  messages: messageSlice,
});
