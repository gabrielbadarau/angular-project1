import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {

  id:number | undefined

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
  }

}
