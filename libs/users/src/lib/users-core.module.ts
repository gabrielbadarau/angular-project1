import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { UsersListComponent } from './users-list/users-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [UsersListComponent, UserDetailComponent],
  imports: [CommonModule, ToastModule, ConfirmDialogModule, TableModule, RouterModule],
  exports: [UsersListComponent, UserDetailComponent]
})
export class UsersListModule {}
