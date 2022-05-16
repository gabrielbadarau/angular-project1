import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';

const selectUsersFeatureState = createFeatureSelector<UsersState>('users');
export const selectUsersList = createSelector(selectUsersFeatureState, (state) => state.users);
export const selectUsersError = createSelector(selectUsersFeatureState, (state) => state.error);
export const selectUserId = createSelector(selectUsersFeatureState, (state) => state.currentUserId);
export const selectUserWithId = createSelector(selectUsersList, selectUserId, (transactions, currentTransactionId) =>
  transactions.find((transaction) => transaction.id === currentTransactionId)
);
