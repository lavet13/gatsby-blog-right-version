import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Me } from './me.types';
import { rawUserItemType } from '../user/user.types';
import { formatISO } from 'date-fns';

export type MeState = {
  me: Me | null;
  meError: Error | null;
  meIsLoading: boolean;
};

const initialState: MeState = {
  me: null,
  meError: null,
  meIsLoading: false,
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

    fetchMeFailed(state, action: PayloadAction<MeState['meError']>) {
      state.meError = action.payload;
    },

    meErrorsReset(state) {
      state.meError = null;
    },

    meLoadingReset(state) {
      state.meIsLoading = false;
    },
  },
});

export default meSlice.reducer;

export const {
  fetchMeStarted,
  fetchMeSucceeded,
  fetchMeFailed,
  meErrorsReset,
  meLoadingReset,
} = meSlice.actions;
