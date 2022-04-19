import { Component, OnDestroy, OnInit } from '@angular/core';

import {MenuItem, MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TransactionsService } from './transactions/transactions.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService],
})

export class AppComponent implements OnInit,OnDestroy{
  
  title = 'Project1';
  headerItems: MenuItem[] = [];
  sideItems: MenuItem[]=[];
  visibleSidebar1:boolean=false;
  appSubscriptions:Subscription[]=[];

  constructor(private primengConfig: PrimeNGConfig,
    private usersService:UsersService,
    private messageService:MessageService,
    private transactionsService:TransactionsService) {}

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

    this.appSubscriptions.push(this.usersService.updateUserSuccessChange$.subscribe(value=>this.handleMessage(value,'user','updated')))
    this.appSubscriptions.push(this.usersService.updateDeleteUserChange$.subscribe(value=>this.handleMessage(value,'user','deleted')))
    this.appSubscriptions.push(this.transactionsService.updateTransactionSuccessChange$.subscribe(value=>this.handleMessage(value,'transaction','updated')))
    this.appSubscriptions.push(this.transactionsService.updateDeleteTransactionChange$.subscribe(value=>this.handleMessage(value,'transaction','deleted')))
  }

  ngOnDestroy(): void {
    this.appSubscriptions.forEach((subscription)=>subscription.unsubscribe());
  }

  handleMessage(value:boolean,object:string,action:string):void{
    this.messageService.add({
      severity: value ? 'success':'error', 
      summary: value ? 'Success':'Error', 
      detail: value ? `Operation succesful, ${object} ${action} !` : `Operation failed, the ${object} has not been ${action}. Check the errors.`,
    })
  }
}
