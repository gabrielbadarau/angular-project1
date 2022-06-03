import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

const selectTransactionsFeatureState = createFeatureSelector<TransactionsState>('transactions');

export const selectTransactionsList = createSelector(selectTransactionsFeatureState, (state) => state.transactions);
export const selectTransactionsError = createSelector(selectTransactionsFeatureState, (state) => state.error);
export const selectCurrentTransaction = createSelector(
  selectTransactionsFeatureState,
  (state) => state.currentTransaction
);
export const selectProductId = createSelector(selectTransactionsFeatureState, (state) => state.currentProductId);
export const selectProductWithId = createSelector(
  selectCurrentTransaction,
  selectProductId,
  (transaction, currentProductId) => transaction.products.find((product) => product.id === currentProductId)
);
