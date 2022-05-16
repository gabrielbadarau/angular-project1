import { createAction, props } from '@ngrx/store';
import { Iusers } from '../../users';

export const getUsersListSuccess = createAction('[Users API] Get List Success', props<{ users: Iusers[] }>());
export const getUsersListFailure = createAction('[Users API] Get List Failure', props<{ error: string }>());
export const updateUsersListSuccess = createAction('[Users API] Update List Success', props<{ user: Iusers }>());
export const updateUsersListFailure = createAction('[Users API] Update List Failure', props<{ error: string }>());
export const deleteUserSuccess = createAction('[Users API] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[Users API] Delete User Failure', props<{ error: string }>());
