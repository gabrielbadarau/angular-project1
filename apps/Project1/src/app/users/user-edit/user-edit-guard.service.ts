import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserEditComponent } from './user-edit.component';

@Injectable()
export class UserEditGuardService implements CanDeactivate<UserEditComponent> {
  canDeactivate(component: UserEditComponent): Observable<boolean> {
    component.showModalAction(true);
    if (component.userForm.dirty && !component.isUpdating) {
      return component.selectAnswerModal$;
    }
    return of(true);
  }
}
