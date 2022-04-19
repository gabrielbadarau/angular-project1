import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  providers: [ConfirmationService],
})
export class UsersListComponent implements OnInit,OnDestroy {

  users:Iusers[]=[];
  usersSubscriptions:Subscription[]=[];

  constructor(
    private usersService:UsersService,
    private router:Router,
    private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.usersSubscriptions.push(this.usersService.getUsers().subscribe({
      next:(users:Iusers[])=>{
        this.users=users;
      },
    }))
  }

  ngOnDestroy(): void {
    this.usersSubscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  confirmDelete(id) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this user?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.usersSubscriptions.push(this.usersService.deleteUser(id).subscribe({
            next:()=>{
              this.usersService.changeUpdateDeleteUser(true);
              this.ngOnInit();
            },
            error:(error)=>{
              console.error(error)
              this.usersService.changeUpdateDeleteUser(false);
            }
          }))
        }
    });
  }
}
