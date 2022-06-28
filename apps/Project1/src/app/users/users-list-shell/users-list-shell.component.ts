import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { map, tap } from 'rxjs';
import { Iusers } from '../../../../../../libs/core-data/src';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-shell-list',
  templateUrl: './users-list-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class UsersListShellComponent {
  toastMessage$ = this.usersService.toastMessageAction$.pipe(tap((data) => this.handleMessage(data[0], data[1])));
  users$ = this.usersService.getAll();
  errorMessage$ = this.usersService.errors$.pipe(map((data) => data.payload.data.error.message));

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private usersService: UsersService
  ) {
    this.users$ = usersService.entities$;
  }

  confirmDelete(user: Iusers) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.delete(user.id);
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
