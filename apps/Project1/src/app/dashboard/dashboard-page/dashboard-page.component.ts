import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectTransactionsError, selectTransactionsList } from '../../transactions/state';
import { TransactionsPageActions } from '../../transactions/state/actions';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit {
  errorMessage$ = this.store.pipe(select(selectTransactionsError));
  transactions$ = this.store.pipe(select(selectTransactionsList));

  ngOnInit(): void {
    this.store.dispatch(TransactionsPageActions.getTransactionsList());
  }

  constructor(private store: Store) {}
}
