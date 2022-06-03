import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-shell-detail',
  templateUrl: './user-detail-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailShellComponent {
  user$ = this.usersService.getByKey(+this.route.snapshot.paramMap.get('id'));
  errorMessage$ = this.usersService.errors$.pipe(map((data) => data.payload.data.error.message));
  constructor(private route: ActivatedRoute, private usersService: UsersService) {}
}
