import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id:number | undefined;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));
  }

}
