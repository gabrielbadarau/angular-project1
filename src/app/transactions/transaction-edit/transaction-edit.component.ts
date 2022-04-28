import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { Itransactions } from '../transactions';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css'],
  providers: [ConfirmationService],
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  transaction: Itransactions;
  isUpdating: boolean = false;
  displayModal: boolean;
  transactionEditSubscriptions: Subscription[] = [];

  private answerModal = new Subject<boolean>();
  selectAnswerModal$ = this.answerModal.asObservable();

  get products(): FormArray {
    return <FormArray>this.transactionForm.get('products');
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private transactionsService: TransactionsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

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

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transactionEditSubscriptions.push(
      this.transactionsService.getId(id).subscribe({
        next: (transaction) => this.displayTransaction(transaction),
        error: (error) => console.error(error),
      })
    );
  }

  ngOnDestroy(): void {
    this.transactionEditSubscriptions.forEach((subscription) => subscription.unsubscribe());
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

    // below, we transform the date from the calendar picker to string so that could fit in our database
    this.transactionForm.value.date = `${
      this.transactionForm.value.date.getMonth() + 1 < 10
        ? '0' + (this.transactionForm.value.date.getMonth() + 1)
        : this.transactionForm.value.date.getMonth() + 1
    }.${
      this.transactionForm.value.date.getDate() < 10
        ? '0' + this.transactionForm.value.date.getDate()
        : this.transactionForm.value.date.getDate()
    }.${this.transactionForm.value.date.getFullYear()}`;

    if (this.transactionForm.dirty) {
      this.transactionEditSubscriptions.push(
        this.transactionsService.updateTransaction(this.transaction.id, this.transactionForm.value).subscribe({
          next: () => {
            this.transactionsService.changeUpdateTransactionSuccess(true);
            this.router.navigate(['/transactions']);
          },
          error: (error) => {
            console.error(error);
            this.transactionsService.changeUpdateTransactionSuccess(false);
          },
        })
      );
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
        this.transactionEditSubscriptions.push(
          this.transactionsService.deleteTransaction(this.transaction.id).subscribe({
            next: () => {
              this.transactionsService.changeUpdateDeleteTransaction(true);
              this.router.navigate(['/transactions']);
            },
            error: (error) => {
              console.error(error);
              this.transactionsService.changeUpdateDeleteTransaction(false);
            },
          })
        );
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

  changeAnswerModal(value: boolean) {
    this.answerModal.next(value);
  }

  modalChoice(event): void {
    this.displayModal = false;
    this.changeAnswerModal(event.target.innerText === 'Yes' ? true : false);
  }
}
