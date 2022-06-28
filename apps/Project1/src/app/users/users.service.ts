import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Subject } from 'rxjs';
import { Iusers } from '../../../../../libs/core-data/src';


@Injectable()
export class UsersService extends EntityCollectionServiceBase<Iusers> {
  private toastMessageSubject = new Subject<[value: boolean, action: string]>();
  toastMessageAction$ = this.toastMessageSubject.asObservable();

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Users', serviceElementsFactory);
  }

  pushMessageAction(value: boolean, action: string) {
    this.toastMessageSubject.next([value, action]);
  }
}
