import { CommonModule } from '@angular/common';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { Iusers } from '@project1/core-data';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { first } from 'rxjs';
import { UsersListComponent } from './users-list.component';

describe('UsersListComponent Presentational Component', () => {
  let spectator: Spectator<UsersListComponent>;
  const createComponent = createComponentFactory({
    component: UsersListComponent,
    imports: [CommonModule, ToastModule, TableModule, ConfirmDialogModule],
    providers: [ConfirmationService, MessageService]
  });

  let mockUserVladimir = {
    "first_name": "Vladimir",
    "last_name": "Ionescu",
    "id": 1013,
    "email": "Vladimir_Ionescu@gmail.com",
    "password": "gjkdlp908",
    "profile_picture": "../../../assets/b13.jpg",
    "role": "Tester",
    "permissions": "Chunin"
  }

  beforeEach(() => spectator = createComponent());

  it('UsersList should exist', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('Error message test', () => {
    expect(spectator.query('.p-error')).toBeFalsy();
    spectator.setInput('errorMessage', 'Houston, we have an error')
    expect(spectator.query('.p-error')).toBeTruthy();
  });

  let output: Iusers;
  it('test output action on click', () => {
    spectator.component.confirmDelete.pipe(first()).subscribe((value) => output = value)
    spectator.component.clickDelete(mockUserVladimir);
    expect(output).toBe(mockUserVladimir)
  })

});