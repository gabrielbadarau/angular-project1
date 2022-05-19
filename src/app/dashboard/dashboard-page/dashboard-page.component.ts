import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectTransactionsError, selectTransactionsList } from 'src/app/transactions/state';
import { getTransactionsList } from 'src/app/transactions/state/actions/transactions-page.actions';

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
    this.store.dispatch(getTransactionsList());
  }

  constructor(private store: Store) {}
}
