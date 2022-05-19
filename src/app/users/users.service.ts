import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Subject } from 'rxjs';
import { Iusers } from './users';

@Injectable()
export class UsersService extends EntityCollectionServiceBase<Iusers> {
  private toastMessageSubject = new Subject<[value: boolean, action: string]>();
  toastMessageAction$ = this.toastMessageSubject.asObservable();

  private choiceToDeleteUserSubject = new Subject<Iusers>();
  choiceToDeleteUserAction$ = this.choiceToDeleteUserSubject.asObservable();

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Users', serviceElementsFactory);
  }

  pushChoiceDeleteUser(value: Iusers) {
    this.choiceToDeleteUserSubject.next(value);
  }
  pushMessageAction(value: boolean, action: string) {
    this.toastMessageSubject.next([value, action]);
  }
}
