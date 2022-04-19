import { Component, OnInit } from '@angular/core';

import {MenuItem, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})

export class AppComponent implements OnInit {
  title = 'Project1';

  headerItems: MenuItem[] = [];
  sideItems: MenuItem[]=[];

  visibleSidebar1:boolean=false;

  constructor(private primengConfig: PrimeNGConfig,
    private usersService:UsersService,
    private messageService:MessageService) {}

  ngOnInit(): void {

   this.primengConfig.ripple = true;

    this.headerItems = [
      {label: 'Home', icon: 'pi pi-fw pi-home', routerLink:'/'},
      {label: 'About Us', icon: 'pi pi-fw pi-info-circle'},
      {label: 'Contact', icon: 'pi pi-fw pi-send'}
    ];

    this.sideItems = [
      {
        label: 'Navigate',
          items: [{
              label: 'Transactions', 
            },
            {
              label: 'Router',
           
            }
          ]
        }
    ];

    this.usersService.updateUserSuccessChange$.subscribe(value=>this.handleUpdateMessage(value))

    this.usersService.updateDeleteUserChange$.subscribe(value=>this.handleDeleteMessage(value));

  }

  handleUpdateMessage(value){
    if(value){
      this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated'});
    }
    else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occured while updating user'});
    }
  }

  handleDeleteMessage(value){
    if(value){
      this.messageService.add({severity:'success', summary: 'Success', detail: 'User deleted'});
    }
    else{
      this.messageService.add({severity:'error', summary: 'Error', detail: 'An error occured while deleting user'});
    }
  }

}
