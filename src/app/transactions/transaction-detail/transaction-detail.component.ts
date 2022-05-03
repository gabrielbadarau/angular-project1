import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Subject } from 'rxjs';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDetailComponent {
  id: number;
  currentProductId: number;
  showProduct = false;

  transaction$ = this.transactionsService.getId(+this.route.snapshot.paramMap.get('id')).pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private router: Router
  ) {}

  toggleShowProduct(id: number): void {
    if (!this.showProduct) {
      this.showProduct = true;
      this.currentProductId = id;
    } else if (this.showProduct && id === this.currentProductId) {
      this.showProduct = false;
      this.currentProductId = 0;
      this.router.navigate(['/transactions', this.route.snapshot.paramMap.get('id')]);
    } else {
      this.showProduct = true;
      this.currentProductId = id;
    }
  }
}
