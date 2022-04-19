import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iproducts } from '../../transactions';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {

  transactionId:number;
  productId:number;
  products:Iproducts[];
  product:Iproducts;
  subscription:Subscription;

  constructor(
    private route:ActivatedRoute,
    private transactionsService:TransactionsService,
  ) { }

  ngOnInit(): void {
    console.log("I initialize")
    this.transactionId=this.route.snapshot.parent.params['id'];
    this.subscription=this.transactionsService.getId(this.transactionId).subscribe({
      next:(transaction)=>{
        this.products=transaction.products
        this.route.paramMap.subscribe(
          params=>{
           this.productId=Number(params.get('id'));
           this.findProduct(this.productId)
          }
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  findProduct(id:number):void{
    this.product=this.products.find(product=>product.id===id)
    console.log(this.product)
  }
  
}
