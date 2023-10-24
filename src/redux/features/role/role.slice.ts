import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoleItemType } from './role.types';

export type RolesState = {
  readonly roles: RoleItemType[];
  readonly rolesError: string | null;
  readonly rolesIsLoading: boolean;
};

const initialState: RolesState = {
  roles: [],
  rolesError: null,
  rolesIsLoading: false,
};

const rolesSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    fetchRolesStarted(state) {
      state.rolesIsLoading = true;
    },

    fetchRolesSucceeded(state, action: PayloadAction<RoleItemType[]>) {
      state.roles = action.payload;
    },

    fetchRolesFailed: {
      reducer(state, action: PayloadAction<string>) {
        state.rolesError = action.payload;
      },
      prepare(error: Error) {
        return { payload: JSON.stringify(error) };
      },
    },

    roleErrorsReset(state) {
      state.rolesError = null;
    },

    roleLoadingReset(state) {
      state.rolesIsLoading = false;
    },
  },
});

export default rolesSlice.reducer;

export const {
  fetchRolesFailed,
  fetchRolesStarted,
  fetchRolesSucceeded,
  roleErrorsReset,
  roleLoadingReset,
} = rolesSlice.actions;
