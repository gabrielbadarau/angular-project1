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
export class TransactionsListComponent implements OnInit, OnDestroy {
  transactions: Itransactions[] = [];
  transactionsSubscriptions: Subscription[] = [];

  constructor(private transactionsService: TransactionsService, private confirmationService: ConfirmationService) {}

  ngOnInit(): void {
    this.transactionsSubscriptions.push(
      this.transactionsService.getTransactions().subscribe({
        next: (transactions: Itransactions[]) => {
          this.transactions = transactions;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.transactionsSubscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  confirmDelete(id) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this transaction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.transactionsSubscriptions.push(
          this.transactionsService.deleteTransaction(id).subscribe({
            next: () => {
              this.transactionsService.changeUpdateDeleteTransaction(true);
              this.ngOnInit();
            },
            error: (error) => {
              console.error(error);
              this.transactionsService.changeUpdateDeleteTransaction(false);
            },
          })
        );
      },
      reject: null,
    });
  }
}
