import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Iusers } from './users';
import LOCALHOST from '../localhost';
import { HttpWrapperService } from '../http-wrapper.service';

@Injectable()
export class UsersService {
  private usersUrl = LOCALHOST + '/users';

  users$ = this.wrappedHttp.get<Iusers[]>(this.usersUrl);

  private toastMessageSubject = new Subject<[value: boolean, action: string]>();
  toastMessageAction$ = this.toastMessageSubject.asObservable();

  private choiceToDeleteUserSubject = new Subject<Iusers>();
  choiceToDeleteUserAction$ = this.choiceToDeleteUserSubject.asObservable();

  constructor(private wrappedHttp: HttpWrapperService) {}

  pushChoiceDeleteUser(value: Iusers) {
    this.choiceToDeleteUserSubject.next(value);
  }
  pushMessageAction(value: boolean, action: string) {
    this.toastMessageSubject.next([value, action]);
  }

  updateUser(updatedUser: Iusers): Observable<Iusers> {
    const userUrl = `${this.usersUrl}/${updatedUser.id}`;
    return this.wrappedHttp.put<Iusers>(userUrl, updatedUser);
  }

  deleteUser(id: number): Observable<Iusers> {
    const userUrl = `${this.usersUrl}/${id}`;
    return this.wrappedHttp.delete<Iusers>(userUrl);
  }
}
