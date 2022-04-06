import { Component, OnInit } from '@angular/core';
import { Itransactions } from '../transactions';
import { TransactionsService } from '../transactions.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css']
})
export class TransactionsListComponent implements OnInit {

  transactions:Itransactions[]=[];

  constructor(private transactionsService:TransactionsService) { }

  ngOnInit(): void {
    this.transactionsService.getTransactions().subscribe({
      next:(transactions:Itransactions[])=>{
        this.transactions=transactions;
      }
    })
  }

}
