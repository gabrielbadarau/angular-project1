import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iusers } from '../users';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  id:number | undefined;
  user:Iusers | undefined;

  constructor(
    private route:ActivatedRoute,
    private userService:UsersService,
    ) { }

  ngOnInit(): void {
    this.id=Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getId(this.id).subscribe({
      next: (user:Iusers)=>{
        this.user=user;
      }
    })
  }

}
