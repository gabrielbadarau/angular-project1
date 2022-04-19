import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit,OnDestroy {

  id:number | undefined;
  user:Iusers | undefined;
  subscription:Subscription;

  constructor(
    private route:ActivatedRoute,
    private userService:UsersService,
    ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));

    this.subscription=this.userService.getId(this.id).subscribe({
      next: (user:Iusers)=>{
        this.user=user;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
