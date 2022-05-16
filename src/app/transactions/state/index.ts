import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

const selectTransactionsFeatureState = createFeatureSelector<TransactionsState>('transactions');

export const selectTransactionsList = createSelector(selectTransactionsFeatureState, (state) => state.transactions);
export const selectTransactionsError = createSelector(selectTransactionsFeatureState, (state) => state.error);
export const selectTransactionId = createSelector(
  selectTransactionsFeatureState,
  (state) => state.currentTransactionId
);
export const selectTransactionWithId = createSelector(
  selectTransactionsList,
  selectTransactionId,
  (transactions, currentTransactionId) => transactions.find((transaction) => transaction.id === currentTransactionId)
);
export const selectProductId = createSelector(selectTransactionsFeatureState, (state) => state.currentProductId);
export const selectProductWithId = createSelector(
  selectTransactionWithId,
  selectProductId,
  (transaction, currentProductId) => transaction.products.find((product) => product.id === currentProductId)
);
