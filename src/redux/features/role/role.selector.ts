import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const selectRoleReducer = (state: RootState) => state.roles;

export const selectRoles = createSelector(
  [selectRoleReducer],
  rolesSlice => rolesSlice.roles
);

export const selectRolesIsLoading = createSelector(
  [selectRoleReducer],
  rolesSlice => rolesSlice.rolesIsLoading
);

export const selectRolesError = createSelector(
  [selectRoleReducer],
  rolesSlice =>
    rolesSlice.rolesError ? JSON.parse(rolesSlice.rolesError) : null
);
