import { call, all } from 'typed-redux-saga/macro';
import { messageSagas } from './features/message/message.saga';

export function* rootSaga() {
  yield* all([call(messageSagas)]);
}
