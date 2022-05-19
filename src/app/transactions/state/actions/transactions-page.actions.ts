import { createAction, props } from '@ngrx/store';
import { Itransactions } from '../../transactions';

export const getTransactionsList = createAction('[Transactions Page] Get List');

export const getTransactionWithId = createAction(
  '[Transactions Page] Get Transaction With Id',
  props<{ id: number }>()
);

export const setProductId = createAction('[Transactions Page] Set Product Id', props<{ id: number }>());

export const updateTransactionsList = createAction(
  '[Transactions Page] Update List',
  props<{ transaction: Itransactions }>()
);

export const deleteTransaction = createAction('[Transactions Page] Delete Transaction', props<{ id: number }>());
