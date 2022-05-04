import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, combineLatest, EMPTY, mergeMap, startWith, Subject, tap } from 'rxjs';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class UsersListComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  toastMessage = this.usersService.toastMessageAction$.pipe(tap((data) => this.handleMessage(data[0], data[1])));

  usersWithDelete$ = combineLatest([
    this.usersService.users$,
    this.usersService.choiceToDeleteUserAction$.pipe(
      mergeMap((user) => this.usersService.deleteUser(user.id)),
      tap(() => this.usersService.pushMessageAction(true, 'deleted')),
      catchError((err) => {
        this.usersService.pushMessageAction(false, 'deleted');
        this.errorMessageSubject.next(err);
        return EMPTY;
      }),
      startWith(null)
    ),
  ]).pipe(
    mergeMap(() => this.usersService.users$),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirmDelete(user: Iusers) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.pushChoiceDeleteUser(user);
      },
      reject: null,
    });
  }

  handleMessage(value: boolean, action: string): void {
    this.messageService.add({
      severity: value ? 'success' : 'error',
      summary: value ? 'Success' : 'Error',
      detail: value
        ? `Operation succesful, user ${action} !`
        : `Operation failed, the user has not been ${action}. Check the errors.`,
    });
  }
}
