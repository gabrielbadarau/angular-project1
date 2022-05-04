import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Itransactions } from './transactions';
import LOCALHOST from '../localhost';
import { HttpWrapperService } from '../http-wrapper.service';

@Injectable()
export class TransactionsService {
  private transactionsUrl = LOCALHOST + '/transactions';
  private transactions: Itransactions[] = [];

  transactions$ = this.wrappedHttp
    .get<Itransactions[]>(this.transactionsUrl)
    .pipe(tap((data) => (this.transactions = data)));

  private toastMessageSubject = new Subject<[value: boolean, action: string]>();
  toastMessageAction$ = this.toastMessageSubject.asObservable();

  private choiceToDeleteTransactionSubject = new Subject<Itransactions>();
  choiceToDeleteTransactionAction$ = this.choiceToDeleteTransactionSubject.asObservable();

  constructor(private wrappedHttp: HttpWrapperService) {}

  pushChoiceDeleteTransaction(value: Itransactions) {
    this.choiceToDeleteTransactionSubject.next(value);
  }
  pushMessageAction(value: boolean, action: string) {
    this.toastMessageSubject.next([value, action]);
  }

  getId(id: number): Observable<Itransactions> {
    if (this.transactions) {
      const foundTransaction = this.transactions.find((transaction) => transaction.id === id);
      if (foundTransaction) {
        return of(foundTransaction);
      }
    }
    const transactionUrl = `${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.get<Itransactions>(transactionUrl);
  }

  updateTransaction(id: number, updatedTransaction: Itransactions): Observable<Itransactions> {
    const transactionUrl = `${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.put<Itransactions>(transactionUrl, updatedTransaction);
  }

  deleteTransaction(id: number): Observable<Itransactions> {
    const transactionUrl = `${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.delete<Itransactions>(transactionUrl);
  }
}
