import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {

  users:Iusers[]=[];

  constructor(
    private usersService:UsersService) { }

  ngOnInit(): void {

    this.usersService.getUsers().subscribe({
      next:(users:Iusers[])=>{
        this.users=users;
      },
    })
  }
  
}
