import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import { Itransactions } from './transactions';
import LOCALHOST from '../localhost';
import { HttpWrapperService } from '../http-wrapper.service';

@Injectable()

export class TransactionsService {
  private transactionsUrl=LOCALHOST+'/transactions';
  private transactions: Itransactions[]=[];

  private updateTransactionSuccessSource=new Subject <boolean>();
  updateTransactionSuccessChange$=this.updateTransactionSuccessSource.asObservable();

  private updateDeleteTransactionSource=new Subject <boolean>();
  updateDeleteTransactionChange$=this.updateDeleteTransactionSource.asObservable();

  constructor(private wrappedHttp:HttpWrapperService) { }

  changeUpdateTransactionSuccess(value:boolean){
    this.updateTransactionSuccessSource.next(value);
  }
  changeUpdateDeleteTransaction(value:boolean){
    this.updateDeleteTransactionSource.next(value);
  }

  getTransactions():Observable<Itransactions[]>{
    return this.wrappedHttp.get<Itransactions[]>(this.transactionsUrl)
    .pipe(tap(data=>this.transactions=data))
  }

  getId(id:number):Observable<Itransactions>{
    if(this.transactions){
      const foundTransaction=this.transactions.find(transaction=>transaction.id===id)
      if(foundTransaction){
        return of(foundTransaction);
      }
    }
    const transactionUrl=`${this.transactionsUrl}/${id}`
    return this.wrappedHttp.get<Itransactions>(transactionUrl)
  }

  updateTransaction(id:number,updatedTransaction:Itransactions):Observable<Itransactions>{
    const transactionUrl=`${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.put<Itransactions>(transactionUrl,updatedTransaction)
  }

  deleteTransaction(id:number):Observable<Itransactions>{
    const transactionUrl=`${this.transactionsUrl}/${id}`;
    return this.wrappedHttp.delete<Itransactions>(transactionUrl);
  }

}
