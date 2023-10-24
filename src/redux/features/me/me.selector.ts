import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export const selectMeReducer = (state: RootState) => state.me;

export const selectMe = createSelector(
  [selectMeReducer],
  meSlice => meSlice.me
);

export const selectMeError = createSelector(
  [selectMeReducer],
  meSlice => meSlice.meError
);

export const selectMeIsLoading = createSelector(
  [selectMeReducer],
  meSlice => meSlice.meIsLoading
);
