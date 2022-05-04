import { Injectable } from '@angular/core';
import { Itransactions } from '../transactions/transactions';
import { tap } from 'rxjs';
import { DateService } from '../shared/date.service';
import { TransactionsService } from '../transactions/transactions.service';

@Injectable()
export class DashboardService {
  transactions: Itransactions[] = [];

  transactions$ = this.transactionsService.transactions$.pipe(tap((data) => (this.transactions = data)));

  constructor(private dateService: DateService, private transactionsService: TransactionsService) {}

  getTransactionsDatesString(): string[] {
    return this.transactions.map((transaction) => transaction.date);
  }

  getLastYearTransactionsString(): string[] {
    const transactionsDatesString = this.getTransactionsDatesString();
    return transactionsDatesString.filter((date) => {
      const lastYear = new Date().getFullYear() - 1;
      const lastMonth = new Date().getMonth() + 2;
      const transactionYear = +date.split('.')[2];
      const transactionMonth = +date.split('.')[0];
      return transactionYear === lastYear + 1 || (transactionYear === lastYear && +transactionMonth >= lastMonth);
    });
  }

  getFilteredAndSortedTransactions(a: Date, b: Date): Itransactions[] {
    const filteredAndSortedTransactions = this.transactions.filter((transaction) => {
      const transactionDate = this.dateService.transformStringToDate(transaction.date);
      return transactionDate.getTime() >= a.getTime() && transactionDate.getTime() <= b.getTime();
    });
    filteredAndSortedTransactions.sort((a, b) => {
      return (
        this.dateService.transformStringToDate(a.date).getTime() -
        this.dateService.transformStringToDate(b.date).getTime()
      );
    });
    return filteredAndSortedTransactions;
  }
}
