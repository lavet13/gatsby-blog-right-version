import { takeLatest, call, all, put } from 'typed-redux-saga/macro';

import {
  fetchMessagesStarted,
  fetchMessagesFailed,
  fetchMessagesSucceeded,
  messageLoadingReset,
  messageErrorsReset,
} from './message.slice';

import { fetchMessages } from '../../../common/utils/messages.utils';

export function* fetchMessagesAsync(
  action: ReturnType<typeof fetchMessagesStarted>
) {
  try {
    const {
      data: { messages },
    } = yield* call(fetchMessages);

    yield* call(console.log, { messages });

    yield* put(fetchMessagesSucceeded(messages));
  } catch (error: any) {
    yield* put(fetchMessagesFailed(error));
  }
}

export function* resetLoadingState() {
  yield* put(messageLoadingReset());
}

export function* resetErrorsAndLoadingState() {
  yield* all([put(messageLoadingReset()), put(messageErrorsReset())]);
}

export function* onFetchMessageStart() {
  yield* takeLatest(fetchMessagesStarted.type, fetchMessagesAsync);
}

export function* onFetchMessageSucceeded() {
  yield* takeLatest(fetchMessagesSucceeded.type, resetErrorsAndLoadingState);
}

export function* onFetchMessageFailed() {
  yield* takeLatest(fetchMessagesFailed.type, resetLoadingState);
}

export function* messageSagas() {
  yield* all([
    call(onFetchMessageStart),
    call(onFetchMessageFailed),
    call(onFetchMessageSucceeded),
  ]);
}
