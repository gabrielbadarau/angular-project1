import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { State } from 'src/app/state/app.state';
import { TransactionsPageActions } from '../state/actions';
import { selectTransactionsError, selectTransactionWithId, selectProductId } from '../state';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailComponent implements OnInit {
  currentProductId: number;

  transaction$ = this.store.pipe(
    select(selectTransactionWithId),
    tap((data) => (!data ? this.store.dispatch(TransactionsPageActions.getTransactionsList()) : null))
  );
  checkProductId$ = this.store.pipe(
    select(selectProductId),
    tap((data) => (data ? (this.currentProductId = data) : null))
  );
  errorMessage$ = this.store.pipe(select(selectTransactionsError));

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(TransactionsPageActions.setTransactionId({ id: +this.route.snapshot.paramMap.get('id') }));
  }

  toggleShowProduct(id: number): void {
    if (this.currentProductId === id) {
      this.router.navigate(['/transactions', this.route.snapshot.paramMap.get('id')]);
      this.currentProductId = null;
    } else {
      this.currentProductId = id;
    }
  }
}
