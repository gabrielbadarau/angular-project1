import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UsersService } from '../users.service';
import { UsersApiActions, UsersPageActions } from './actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  getUsersList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersPageActions.getUsersList),
      mergeMap(() =>
        this.usersService.users$.pipe(
          map((users) => UsersApiActions.getUsersListSuccess({ users })),
          catchError((error) => of(UsersApiActions.getUsersListFailure({ error })))
        )
      )
    );
  });

  updateTransactionsList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersPageActions.updateUsersList),
      mergeMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map((user) => {
            this.usersService.pushMessageAction(true, 'updated');
            return UsersApiActions.updateUsersListSuccess({ user });
          }),
          catchError((error) => {
            this.usersService.pushMessageAction(false, 'updated');
            return of(UsersApiActions.updateUsersListFailure({ error }));
          })
        )
      )
    );
  });

  deletetransaction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersPageActions.deleteUser),
      mergeMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map(() => {
            this.usersService.pushMessageAction(true, 'deleted');
            return UsersApiActions.deleteUserSuccess({ id: action.id });
          }),
          catchError((error) => {
            this.usersService.pushMessageAction(false, 'deleted');
            return of(UsersApiActions.deleteUserFailure({ error }));
          })
        )
      )
    );
  });
}
