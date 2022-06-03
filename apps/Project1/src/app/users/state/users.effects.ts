import { Injectable } from '@angular/core';
import { EntityOp, ofEntityOp, ofEntityType } from '@ngrx/data';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  ngrxDataEffectForDeleteSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType('[Users] @ngrx/data/save/delete-one/success'),
        tap(() => this.usersService.pushMessageAction(true, 'deleted'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForDeleteFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType('[Users] @ngrx/data/save/delete-one/error'),
        tap(() => this.usersService.pushMessageAction(false, 'deleted'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForUpdateSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType('[Users] @ngrx/data/save/update-one/success'),
        tap(() => this.usersService.pushMessageAction(true, 'updated'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForUpdateFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType('[Users] @ngrx/data/save/update-one/error'),
        tap(() => this.usersService.pushMessageAction(false, 'updated'))
      );
    },
    { dispatch: false }
  );
}
