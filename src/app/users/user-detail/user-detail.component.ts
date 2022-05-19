import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  user$ = this.usersService.getByKey(+this.route.snapshot.paramMap.get('id'));
  errorMessage$ = this.usersService.errors$.pipe(map((data) => data.payload.data.error.message));
  constructor(private route: ActivatedRoute, private usersService: UsersService) {}
}
