import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TransactionEditComponent } from './transaction-edit.component';

@Injectable()
export class TransactionEditGuardService implements CanDeactivate<TransactionEditComponent> {
  canDeactivate(component: TransactionEditComponent): Observable<boolean> {
    component.showModalAction(true);
    if (component.transactionForm.dirty && !component.isUpdating) {
      return component.selectAnswerModal$;
    }
    return of(true);
  }
}
