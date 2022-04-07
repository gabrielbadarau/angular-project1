import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Itransactions } from './transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsUrl='http://localhost:3004/transactions';
  private transactions: Itransactions[]=[];

  constructor(private http:HttpClient) { }

  getTransactions():Observable<Itransactions[]>{

    if(this.transactions.length){
      return of(this.transactions)
    }

    return this.http.get<Itransactions[]>(this.transactionsUrl)
    .pipe(
      tap(data=>{
        console.log(data);
        this.transactions=data;
      })
    )
  }

  getId(id:number):Observable<Itransactions>{

    if(this.transactions){
      const foundTransaction=this.transactions.find(transaction=>transaction.id===id)
      if(foundTransaction){
        return of(foundTransaction);
      }
    }
    const transactionUrl=`${this.transactionsUrl}/${id}`
    return this.http.get<Itransactions>(transactionUrl)
    .pipe(
      tap(data=>{
          console.log(data);
        }
      )
    )
  }
}
