import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { selectTransactionsError, selectTransactionsList } from '../state';
import { TransactionsPageActions } from '../state/actions';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class TransactionsListComponent implements OnInit {
  toastMessage$ = this.transactionsService.toastMessageAction$.pipe(
    tap((data) => this.handleMessage(data[0], data[1]))
  );
  transactions$ = this.store.pipe(select(selectTransactionsList));
  errorMessage$ = this.store.pipe(select(selectTransactionsError));

  constructor(
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(TransactionsPageActions.getTransactionsList());
  }

  confirmDelete(transaction) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this transaction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(TransactionsPageActions.deleteTransaction({ id: transaction.id }));
      },
      reject: null,
    });
  }

  handleMessage(value: boolean, action: string): void {
    this.messageService.add({
      severity: value ? 'success' : 'error',
      summary: value ? 'Success' : 'Error',
      detail: value
        ? `Operation succesful, transaction ${action} !`
        : `Operation failed, the transaction has not been ${action}. Check the errors.`,
    });
  }
}
