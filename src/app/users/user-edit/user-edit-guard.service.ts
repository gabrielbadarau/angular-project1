import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserEditComponent } from './user-edit.component';

@Injectable()

export class UserEditGuardService implements CanDeactivate<UserEditComponent> {

  canDeactivate(component: UserEditComponent): boolean {
    if(component.userForm.dirty && !component.isUpdating){
      return confirm(`Navigate away and lose all changes to ${component.user.first_name} ${component.user.last_name}?`)
    }
    return true;
  }

}
