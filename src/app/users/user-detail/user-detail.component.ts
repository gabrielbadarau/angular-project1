import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { UsersPageActions } from '../state/actions';
import { selectUsersError, selectUserWithId } from '../state';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent implements OnInit {
  user$ = this.store.pipe(
    select(selectUserWithId),
    tap((data) => (!data ? this.store.dispatch(UsersPageActions.getUsersList()) : null))
  );
  errorMessage$ = this.store.pipe(select(selectUsersError));

  constructor(private route: ActivatedRoute, private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.setUserId({ id: +this.route.snapshot.paramMap.get('id') }));
  }
}
