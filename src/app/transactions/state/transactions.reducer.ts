import { createReducer, on } from '@ngrx/store';
import { Itransactions } from '../transactions';
import { TransactionsPageActions, TransactionsApiActions } from './actions';

export interface TransactionsState {
  transactions: Itransactions[];
  currentTransactionId: number;
  currentProductId: number;
  error: string;
}

const initialState: TransactionsState = {
  transactions: [],
  currentTransactionId: null,
  currentProductId: null,
  error: '',
};

export const transactionsReducer = createReducer<TransactionsState>(
  initialState,
  on(TransactionsApiActions.getTransactionsListSuccess, (state, action): TransactionsState => {
    return {
      ...state,
      transactions: action.transactions,
    };
  }),
  on(TransactionsApiActions.getTransactionsListFailure, (state, action): TransactionsState => {
    return {
      ...state,
      transactions: [],
      currentTransactionId: null,
      currentProductId: null,
      error: action.error,
    };
  }),
  on(TransactionsPageActions.setTransactionId, (state, action): TransactionsState => {
    return {
      ...state,
      currentTransactionId: action.id,
      currentProductId: null,
    };
  }),
  on(TransactionsPageActions.setProductId, (state, action): TransactionsState => {
    return {
      ...state,
      currentProductId: action.id,
    };
  }),
  on(TransactionsApiActions.updateTransactionsListSuccess, (state, action): TransactionsState => {
    const updatedTransactions = state.transactions.map((transaction) =>
      transaction.id === action.transaction.id ? action.transaction : transaction
    );
    return {
      ...state,
      transactions: updatedTransactions,
    };
  }),
  on(TransactionsApiActions.updateTransactionsListFailure, (state, action): TransactionsState => {
    return {
      ...state,
      transactions: [],
      currentTransactionId: null,
      currentProductId: null,
      error: action.error,
    };
  }),
  on(TransactionsApiActions.deleteTransactionSuccess, (state, action): TransactionsState => {
    const updatedTransactionsAfterDelete = state.transactions.filter((transaction) => transaction.id !== action.id);
    return {
      ...state,
      transactions: updatedTransactionsAfterDelete,
    };
  }),
  on(TransactionsApiActions.deleteTransactionFailure, (state, action): TransactionsState => {
    return {
      ...state,
      transactions: [],
      currentTransactionId: null,
      currentProductId: null,
      error: action.error,
    };
  })
);
