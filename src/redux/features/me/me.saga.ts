import { put, call, all, takeLatest } from 'typed-redux-saga/macro';

import {
  fetchMeStarted,
  fetchMeFailed,
  fetchMeSucceeded,
  meLoadingReset,
  meErrorsReset,
} from './me.slice';
import { fetchMe } from '../../../common/utils/me.utils';

export function* fetchMeAsync() {
  try {
    const {
      data: { me },
    } = yield* call(fetchMe);

    yield* put(fetchMeSucceeded(me));
  } catch (error: any) {
    yield* put(fetchMeFailed(error));
  }
}

export function* resetLoadingState() {
  yield* put(meLoadingReset());
}

export function* resetErrorsAndLoadingState() {
  yield* all([put(meErrorsReset()), put(meLoadingReset())]);
}

export function* onFetchMeStarted() {
  yield* takeLatest(fetchMeStarted.type, fetchMeAsync);
}

export function* onFetchMeSucceeded() {
  yield* takeLatest(fetchMeSucceeded.type, resetErrorsAndLoadingState);
}

export function* onFetchMeFailed() {
  yield* takeLatest(fetchMeFailed.type, resetLoadingState);
}

export function* meSagas() {
  yield* all([
    call(onFetchMeStarted),
    call(onFetchMeSucceeded),
    call(onFetchMeFailed),
  ]);
}
