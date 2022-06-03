import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { TransactionsPageActions } from '../state/actions';
import { selectTransactionsError, selectProductId, selectCurrentTransaction } from '../state';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailComponent implements OnInit {
  currentProductId: number;

  transaction$ = this.store.pipe(select(selectCurrentTransaction));

  checkProductId$ = this.store.pipe(
    select(selectProductId),
    tap((data) => (data ? (this.currentProductId = data) : null))
  );
  errorMessage$ = this.store.pipe(select(selectTransactionsError));

  constructor(private route: ActivatedRoute, private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(TransactionsPageActions.getTransactionWithId({ id: +this.route.snapshot.paramMap.get('id') }));
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
