import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users.effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './state/entity-metadata';
import { UsersListShellComponent } from './users-list-shell/users-list-shell.component';
import { UserDetailShellComponent } from './user-detail-shell/user-detail-shell.component';
import { UsersListModule } from '../../../../../libs/users/src'

const customDataServiceConfig: DefaultDataServiceConfig = {
  root: 'http://localhost:3004',
  timeout: 3000,
};

@NgModule({
  declarations: [UsersListShellComponent, UserDetailShellComponent, UserEditComponent],
  imports: [
    UsersListModule,
    ToastModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ButtonModule,
    InputTextModule,
    RouterModule.forChild([
      { path: 'users', component: UsersListShellComponent },
      { path: 'users/:id', component: UserDetailShellComponent },
      { path: 'users/:id/edit', canDeactivate: [UserEditGuardService], component: UserEditComponent },
    ]),
    EffectsModule.forFeature([UsersEffects]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    UserEditGuardService,
    UsersService,
    { provide: DefaultDataServiceConfig, useValue: customDataServiceConfig },
  ],
})
export class UsersModule {}
