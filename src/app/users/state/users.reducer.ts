import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { Iusers } from '../users';
import { UsersApiActions, UsersPageActions } from './actions';

export interface UsersState {
  users: Iusers[];
  currentUserId: number;
  error: string;
}

const initialState: UsersState = {
  users: [],
  currentUserId: null,
  error: '',
};

export const usersReducer = createReducer<UsersState>(
  initialState,
  on(UsersApiActions.getUsersListSuccess, (state, action): UsersState => {
    return {
      ...state,
      users: action.users,
    };
  }),
  on(UsersApiActions.getUsersListFailure, (state, action): UsersState => {
    return {
      ...state,
      users: [],
      currentUserId: null,
      error: action.error,
    };
  }),
  on(UsersPageActions.setUserId, (state, action): UsersState => {
    return {
      ...state,
      currentUserId: action.id,
    };
  }),
  on(UsersApiActions.updateUsersListSuccess, (state, action): UsersState => {
    const updatedUsers = state.users.map((user) => (user.id === action.user.id ? action.user : user));
    return {
      ...state,
      users: updatedUsers,
    };
  }),
  on(UsersApiActions.updateUsersListFailure, (state, action): UsersState => {
    return {
      ...state,
      users: [],
      currentUserId: null,
      error: action.error,
    };
  }),
  on(UsersApiActions.deleteUserSuccess, (state, action): UsersState => {
    const updatedUsersAfterDelete = state.users.filter((user) => user.id !== action.id);
    return {
      ...state,
      users: updatedUsersAfterDelete,
    };
  }),
  on(UsersApiActions.deleteUserFailure, (state, action): UsersState => {
    return {
      ...state,
      users: [],
      currentUserId: null,
      error: action.error,
    };
  })
);
