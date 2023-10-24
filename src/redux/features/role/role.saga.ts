import { call, put, takeLatest, all } from 'typed-redux-saga/macro';

import {
  fetchRolesStarted,
  fetchRolesFailed,
  fetchRolesSucceeded,
  roleLoadingReset,
  roleErrorsReset,
} from './role.slice';

import { fetchRoles } from '../../../common/utils/roles.utils';

export function* fetchRolesAsync() {
  try {
    const {
      data: { roles },
    } = yield* call(fetchRoles);

    yield* put(fetchRolesSucceeded(roles));
  } catch (error: any) {
    yield* put(fetchRolesFailed(error));
  }
}

export function* resetLoadingState() {
  yield* put(roleLoadingReset());
}

export function* resetErrorsAndLoadingState() {
  yield* all([put(roleErrorsReset()), put(roleLoadingReset())]);
}

export function* onFetchRolesStarted() {
  yield* takeLatest(fetchRolesStarted.type, fetchRolesAsync);
}

export function* onFetchRolesSucceeded() {
  yield* takeLatest(fetchRolesSucceeded.type, resetErrorsAndLoadingState);
}

export function* onFetchRolesFailed() {
  yield* takeLatest(fetchRolesFailed.type, resetLoadingState);
}

export function* roleSagas() {
  yield* all([
    call(onFetchRolesStarted),
    call(onFetchRolesFailed),
    call(onFetchRolesSucceeded),
  ]);
}
