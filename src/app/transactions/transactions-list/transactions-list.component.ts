import { Component, OnDestroy, OnInit } from '@angular/core';
import { Itransactions } from '../transactions';
import { TransactionsService } from '../transactions.service';
import { ConfirmationService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  providers: [ConfirmationService],
})
export class TransactionsListComponent implements OnInit,OnDestroy {

  transactions:Itransactions[]=[];
  subscriptions:Subscription[]=[];

  constructor(
    private transactionsService:TransactionsService,
    private confirmationService:ConfirmationService,
    ) { }

  ngOnInit(): void {
    const subscription1=this.transactionsService.getTransactions().subscribe({
      next:(transactions:Itransactions[])=>{
        this.transactions=transactions;
      }
    })
    this.subscriptions.push(subscription1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  confirmDelete(id) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this transaction?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          const subscription2=this.transactionsService.deleteTransaction(id).subscribe({
            next:()=>{
              this.transactionsService.changeUpdateDeleteTransaction(true);
              this.ngOnInit();
            },
            error:(error)=>{
              console.log(error)
              this.transactionsService.changeUpdateDeleteTransaction(false);
            }
          })
          this.subscriptions.push(subscription2);
        },
        reject: null
    });
  }


}
