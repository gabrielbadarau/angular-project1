import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnaryFunction } from 'rxjs';
import { Itransactions } from '../transactions';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  id:number | undefined
  transaction:Itransactions | undefined

  constructor(
    private route:ActivatedRoute,
    private transactionsService:TransactionsService,
    ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.transactionsService.getId(this.id).subscribe({
      next:(transaction:Itransactions)=>{
        this.transaction=transaction;
      }
    })
  }

}
