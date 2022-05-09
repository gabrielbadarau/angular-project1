import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Itransactions } from './transactions';
import LOCALHOST from '../localhost';
import { HttpWrapperService } from '../http-wrapper.service';

@Injectable()
export class TransactionsService {
  private transactionsUrl = LOCALHOST + '/transactions';

  transactions$ = this.wrappedHttp.get<Itransactions[]>(this.transactionsUrl);

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

  updateTransaction(updatedTransaction: Itransactions): Observable<Itransactions> {
    const transactionUrl = `${this.transactionsUrl}/${updatedTransaction.id}`;
    return this.wrappedHttp.put<Itransactions>(transactionUrl, updatedTransaction);
  }

  deleteTransaction(id: number): Observable<Itransactions> {
    const transactionUrl = `${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.delete<Itransactions>(transactionUrl);
  }
}
