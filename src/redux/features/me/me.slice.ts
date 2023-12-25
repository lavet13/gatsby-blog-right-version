import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Me } from './me.types';
import { rawUserItemType } from '../user/user.types';
import { formatISO } from 'date-fns';
import { SignInFormValues } from '../../../pages/sign-in';

export type MeState = {
  me: Me | null;
  meError: string | null;
  meIsLoading: boolean;
  signInIsLoading: boolean;
  signInError: string | null;
  token?: string;
};

const initialState: MeState = {
  me: null,
  meError: null,
  meIsLoading: false,

  signInIsLoading: false,
  signInError: null,

  token: undefined,
};

const meSlice = createSlice({
  name: 'me',
  initialState,
  reducers: {
    fetchMeStarted(state) {
      state.meIsLoading = true;
    },
    fetchMeSucceeded: {
      reducer(state, action: PayloadAction<MeState['me']>) {
        state.me = action.payload;
      },
      prepare(user: rawUserItemType) {
        return {
          payload: user
            ? {
                ...user,
                createdAt: user.createdAt
                  ? formatISO(user.createdAt)
                  : undefined,
                updatedAt: user.updatedAt
                  ? formatISO(user.updatedAt)
                  : undefined,
              }
            : null,
        };
      },
    },

    fetchMeFailed: {
      reducer(state, action: PayloadAction<MeState['meError']>) {
        state.meError = action.payload;
      },

      prepare(error: Error) {
        return {
          payload: JSON.stringify(error),
        };
      },
    },

    fetchSignInStarted(state, _: PayloadAction<SignInFormValues>) {
      state.signInIsLoading = true;
    },

    fetchSignInSucceeded(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },

    fetchSignInFailed: {
      reducer(state, action: PayloadAction<string>) {
        state.signInError = action.payload;
      },

      prepare(error: Error) {
        return {
          payload: JSON.stringify(error),
        };
      },
    },

    meErrorsReset(state) {
      state.meError = null;
      state.signInError = null;
    },

    meLoadingReset(state) {
      state.meIsLoading = false;
      state.signInIsLoading = false;
    },
  },
});

export default meSlice.reducer;

export const {
  fetchMeStarted,
  fetchMeSucceeded,
  fetchMeFailed,

  fetchSignInStarted,
  fetchSignInFailed,
  fetchSignInSucceeded,

  meErrorsReset,
  meLoadingReset,
} = meSlice.actions;
