import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, combineLatest, EMPTY, map, Subject } from 'rxjs';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  product$ = combineLatest([
    this.transactionsService.getId(this.route.snapshot.parent.params['id']),
    this.route.paramMap,
  ]).pipe(
    map(([transaction, params]) => transaction.products.find((product) => product.id === +params.get('id'))),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(private route: ActivatedRoute, private transactionsService: TransactionsService) {}
}
