import { TransactionsState } from '../transactions/state/transactions.reducer';
import { UsersState } from '../users/state/users.reducer';

export interface State {
  transactions: TransactionsState;
  users: UsersState;
}
