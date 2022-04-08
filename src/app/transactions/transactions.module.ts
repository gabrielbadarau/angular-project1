import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

import {TableModule} from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TransactionsService } from './transactions.service';

@NgModule({
  declarations: [
    TransactionsListComponent,
    TransactionDetailComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RouterModule.forChild([
      {path:'transactions', component:TransactionsListComponent},
      {path:'transactions/:id', component:TransactionDetailComponent}
    ])
  ],
  providers:[
    TransactionsService
  ]
})
export class TransactionsModule { }
