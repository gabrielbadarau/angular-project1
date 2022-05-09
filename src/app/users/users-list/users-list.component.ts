import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { selectUsersError, selectUsersList } from '../state';
import { Iusers } from '../users';
import { UsersService } from '../users.service';
import { UsersPageActions } from '../state/actions';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class UsersListComponent implements OnInit {
  toastMessage$ = this.usersService.toastMessageAction$.pipe(tap((data) => this.handleMessage(data[0], data[1])));
  users$ = this.store.pipe(select(selectUsersList));
  errorMessage$ = this.store.pipe(select(selectUsersError));

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.getUsersList());
  }

  confirmDelete(user: Iusers) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(UsersPageActions.deleteUser({ id: user.id }));
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
