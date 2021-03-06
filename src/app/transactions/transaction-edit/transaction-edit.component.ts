import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Subject, tap } from 'rxjs';
import { DateService } from 'src/app/shared/date.service';
import { Itransactions } from '../transactions';
import { TransactionsPageActions } from '../state/actions';
import { selectTransactionsError, selectCurrentTransaction } from '../state';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css'],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionEditComponent implements OnInit {
  transactionForm: FormGroup;
  transaction: Itransactions;
  isUpdating = false;
  showModal = false;

  transaction$ = this.store.pipe(
    select(selectCurrentTransaction),
    tap((data) =>
      data
        ? this.displayTransaction(data)
        : this.store.dispatch(
            TransactionsPageActions.getTransactionWithId({ id: +this.route.snapshot.paramMap.get('id') })
          )
    )
  );
  errorMessage$ = this.store.pipe(select(selectTransactionsError));

  private displayModalSubject = new Subject<boolean>();
  displayModal$ = this.displayModalSubject.asObservable().pipe(tap((data) => (this.showModal = data)));

  private answerModal = new Subject<boolean>();
  selectAnswerModal$ = this.answerModal.asObservable();

  get products(): FormArray {
    return <FormArray>this.transactionForm.get('products');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private dateService: DateService,
    private store: Store
  ) {}

  showModalAction(value: boolean) {
    this.displayModalSubject.next(value);
  }

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      id: [null, [Validators.required, Validators.min(1)]],
      date: ['', Validators.required],
      category: ['', Validators.required],
      receiver: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      VAT: [null, [Validators.required, Validators.min(0)]],
      total_price: [null],
      products: this.fb.array([]),
    });
  }

  displayTransaction(transaction: Itransactions): void {
    if (this.transactionForm) {
      this.transactionForm.reset();
    }
    this.transaction = transaction;
    this.transaction.products.forEach(() => {
      this.products.push(this.buildProduct());
    });
    this.transactionForm.setValue({
      date: this.transaction.date,
      id: this.transaction.id,
      category: this.transaction.category,
      receiver: this.transaction.receiver,
      price: this.transaction.price,
      VAT: this.transaction.VAT,
      total_price: this.transaction.total_price,
      products: this.transaction.products,
    });
  }

  save(): void {
    this.isUpdating = true;
    if (this.transactionForm.dirty) {
      if (this.transactionForm.value.date instanceof Date) {
        this.transactionForm.value.date = this.dateService.transformDatesToStrings([
          this.transactionForm.value.date,
        ])[0];
      }
      //above we transform the date from the calendar picker to string so that could fit in our database
      this.store.dispatch(TransactionsPageActions.updateTransactionsList({ transaction: this.transactionForm.value }));
      this.router.navigate(['/transactions']);
    } else {
      this.router.navigate(['/transactions']);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this transaction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(TransactionsPageActions.deleteTransaction({ id: this.transaction.id }));
        this.router.navigate(['/transactions']);
      },
      reject: null,
    });
  }

  cancel(): void {
    this.router.navigate(['/transactions']);
  }

  buildProduct(): FormGroup {
    return this.fb.group({
      description: ['', Validators.required],
      id: [null, [Validators.required, Validators.min(1)]],
      amount: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(0)]],
      VAT: [null, [Validators.required, Validators.min(0)]],
      total_price: [null],
    });
  }

  modalChoice(event): void {
    this.answerModal.next(event.target.innerText === 'Yes' ? true : false);
    this.showModalAction(false);
  }
}
