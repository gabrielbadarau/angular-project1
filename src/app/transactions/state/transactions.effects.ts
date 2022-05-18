import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { TransactionsService } from '../transactions.service';
import { TransactionsPageActions, TransactionsApiActions } from './actions';

@Injectable()
export class TransactionsEffects {
  constructor(private actions$: Actions, private transactionsService: TransactionsService) {}

  getTransactionsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsPageActions.getTransactionsList),
      mergeMap(() =>
        this.transactionsService.transactions$.pipe(
          map((transactions) => TransactionsApiActions.getTransactionsListSuccess({ transactions })),
          catchError((error) => of(TransactionsApiActions.getTransactionsListFailure({ error })))
        )
      )
    );
  });

  getTransactionWithId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsPageActions.getTransactionWithId),
      mergeMap((action) =>
        this.transactionsService.getTransactionWithId(action.id).pipe(
          map((transaction) => TransactionsApiActions.getTransactionWithIdSuccess({ transaction })),
          catchError((error) => of(TransactionsApiActions.getTransactionWithIdFailure({ error })))
        )
      )
    );
  });

  updateTransactionsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsPageActions.updateTransactionsList),
      mergeMap((action) =>
        this.transactionsService.updateTransaction(action.transaction).pipe(
          map((transaction) => {
            this.transactionsService.pushMessageAction(true, 'updated');
            return TransactionsApiActions.updateTransactionsListSuccess({ transaction });
          }),
          catchError((error) => {
            this.transactionsService.pushMessageAction(false, 'updated');
            return of(TransactionsApiActions.updateTransactionsListFailure({ error }));
          })
        )
      )
    );
  });

  deletetransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TransactionsPageActions.deleteTransaction),
      mergeMap((action) =>
        this.transactionsService.deleteTransaction(action.id).pipe(
          map(() => {
            this.transactionsService.pushMessageAction(true, 'deleted');
            return TransactionsApiActions.deleteTransactionSuccess({ id: action.id });
          }),
          catchError((error) => {
            this.transactionsService.pushMessageAction(false, 'deleted');
            return of(TransactionsApiActions.deleteTransactionFailure({ error }));
          })
        )
      )
    );
  });
}
