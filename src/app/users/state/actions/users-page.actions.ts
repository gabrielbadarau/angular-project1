import { createAction, props } from '@ngrx/store';
import { Iusers } from '../../users';

export const getUsersList = createAction('[Users Page] Get List');
export const setUserId = createAction('[Users Page] Set User Id', props<{ id: number }>());
export const updateUsersList = createAction('[Users Page] Update List', props<{ user: Iusers }>());
export const deleteUser = createAction('[Users Page] Delete User', props<{ id: number }>());
