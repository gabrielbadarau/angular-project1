import { Injectable } from '@angular/core';
import { DateService, Itransactions } from '../../../../../libs/core-data/src'

@Injectable()
export class DashboardService {
  constructor(private dateService: DateService) {}

  getTransactionsDatesString(transactions: Itransactions[]): string[] {
    return transactions.map((transaction) => transaction.date);
  }

  getLastYearTransactionsString(transactions: Itransactions[]): string[] {
    const transactionsDatesString = this.getTransactionsDatesString(transactions);
    return transactionsDatesString.filter((date) => {
      const lastYear = new Date().getFullYear() - 1;
      const lastMonth = new Date().getMonth() + 2;
      const transactionYear = +date.split('.')[2];
      const transactionMonth = +date.split('.')[0];
      return transactionYear === lastYear + 1 || (transactionYear === lastYear && +transactionMonth >= lastMonth);
    });
  }

  getFilteredAndSortedTransactions(a: Date, b: Date, transactions: Itransactions[]): Itransactions[] {
    const filteredAndSortedTransactions = transactions.filter((transaction) => {
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
