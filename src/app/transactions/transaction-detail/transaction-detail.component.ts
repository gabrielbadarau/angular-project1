import { Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Itransactions } from '../transactions';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit, OnDestroy {

  id:number;
  transaction:Itransactions;
  showProduct:boolean=false;
  currentProductId:number;
  transactionSubscription:Subscription;

  constructor(
    private route:ActivatedRoute,
    private transactionsService:TransactionsService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
    this.transactionSubscription=this.transactionsService.getId(this.id).subscribe({
      next:(transaction:Itransactions)=>{
        this.transaction=transaction;
      }
    })
  }

  ngOnDestroy(): void {
    this.transactionSubscription.unsubscribe();
  }

  toggleShowProduct(id:number):void{
    if(!this.showProduct){
      this.showProduct=true;
      this.currentProductId=id;
    }
    else if(this.showProduct && id===this.currentProductId){
      this.showProduct=false;
      this.currentProductId=0;
      this.router.navigate(['/transactions',this.id])
    }
    else{
      this.showProduct=true;
      this.currentProductId=id;
    }
  }
}
