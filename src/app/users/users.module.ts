import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    RouterModule.forChild([
      {path:'users', component:UsersListComponent},
      {path:'users/:id', component:UserDetailComponent}
    ])
  ]
})
export class UsersModule { }
