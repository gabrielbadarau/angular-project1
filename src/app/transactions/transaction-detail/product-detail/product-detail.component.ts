import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs';
import { TransactionsPageActions } from '../../state/actions';
import { selectProductWithId, selectTransactionsError } from '../../state';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  product$ = this.route.paramMap.pipe(
    tap((data) => this.store.dispatch(TransactionsPageActions.setProductId({ id: +data.get('id') }))),
    withLatestFrom(this.store.pipe(select(selectProductWithId))),
    map((data) => data[1])
  );
  errorMessage$ = this.store.pipe(select(selectTransactionsError));
  constructor(private route: ActivatedRoute, private store: Store) {}
}
