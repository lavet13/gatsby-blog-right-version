import { combineReducers } from '@reduxjs/toolkit';

import messageSlice from './features/message/message.slice';
import rolesSlice from './features/role/role.slice';
import meSlice from './features/me/me.slice';

export const rootReducer = combineReducers({
  messages: messageSlice,
  roles: rolesSlice,
  me: meSlice,
});
