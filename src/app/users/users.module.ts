import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { UsersService } from './users.service';

@NgModule({
  declarations: [
    UsersListComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild([
      {path:'users', component:UsersListComponent},
      {path:'users/:id', component:UserDetailComponent}
    ])
  ],
  providers:[
    UsersService
  ]
})
export class UsersModule { }
