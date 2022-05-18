import { Injectable } from '@angular/core';
import { EntityOp, ofEntityOp, ofEntityType } from '@ngrx/data';
import { Actions, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  ngrxDataEffectForDeleteSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofEntityType('Users'),
        ofEntityOp([EntityOp.SAVE_DELETE_ONE_SUCCESS]),
        tap(() => this.usersService.pushMessageAction(true, 'deleted'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForDeleteFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofEntityType('Users'),
        ofEntityOp([EntityOp.SAVE_DELETE_ONE_ERROR]),
        tap(() => this.usersService.pushMessageAction(false, 'deleted'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForUpdateSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofEntityType('Users'),
        ofEntityOp([EntityOp.SAVE_UPDATE_ONE_SUCCESS]),
        tap(() => this.usersService.pushMessageAction(true, 'updated'))
      );
    },
    { dispatch: false }
  );

  ngrxDataEffectForUpdateFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofEntityType('Users'),
        ofEntityOp([EntityOp.SAVE_UPDATE_ONE_ERROR]),
        tap(() => this.usersService.pushMessageAction(false, 'updated'))
      );
    },
    { dispatch: false }
  );
}
