import { createAction, props } from '@ngrx/store';
import { Itransactions } from '../../../../../../../libs/core-data/src';

export const getTransactionsListSuccess = createAction(
  '[Transactions API] Get List Success',
  props<{ transactions: Itransactions[] }>()
);
export const getTransactionsListFailure = createAction('[Transactions] Get List Failure', props<{ error: string }>());

export const getTransactionWithIdSuccess = createAction(
  '[Transactions API] Get Transaction Success',
  props<{ transaction: Itransactions }>()
);

export const getTransactionWithIdFailure = createAction(
  '[Transactions API] Get Transaction Failure',
  props<{ error: string }>()
);

export const updateTransactionsListSuccess = createAction(
  '[Transactions API] Update List Success',
  props<{ transaction: Itransactions }>()
);

export const updateTransactionsListFailure = createAction(
  '[Transactions API] Update List Failure',
  props<{ error: string }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transactions API] Delete Transaction Success',
  props<{ id: number }>()
);

export const deleteTransactionFailure = createAction(
  '[Transactions API] Delete Transaction Failure',
  props<{ error: string }>()
);
