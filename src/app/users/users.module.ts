import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserEditGuardService } from './user-edit/user-edit-guard.service';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsersService } from './users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { HttpWrapperService } from '../http-wrapper.service';

@NgModule({
  declarations: [UsersListComponent, UserDetailComponent, UserEditComponent],
  imports: [
    ToastModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    RouterModule.forChild([
      { path: 'users', component: UsersListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'users/:id/edit', canDeactivate: [UserEditGuardService], component: UserEditComponent },
    ]),
  ],
  providers: [HttpWrapperService, UsersService, UserEditGuardService],
})
export class UsersModule {}
