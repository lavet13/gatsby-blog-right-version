import { call, all } from 'typed-redux-saga/macro';
import { messageSagas } from './features/message/message.saga';
import { roleSagas } from './features/role/role.saga';
import { meSagas } from './features/me/me.saga';

export function* rootSaga() {
  yield* all([call(messageSagas), call(roleSagas), call(meSagas)]);
}
