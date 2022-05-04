import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, combineLatest, EMPTY, mergeMap, startWith, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ConfirmationService, MessageService],
})
export class TransactionsListComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  toastMessage = this.transactionsService.toastMessageAction$.pipe(tap((data) => this.handleMessage(data[0], data[1])));

  transactionsWithDelete$ = combineLatest([
    this.transactionsService.transactions$,
    this.transactionsService.choiceToDeleteTransactionAction$.pipe(
      mergeMap((transaction) => this.transactionsService.deleteTransaction(transaction.id)),
      tap(() => this.transactionsService.pushMessageAction(true, 'deleted')),
      catchError((err) => {
        this.transactionsService.pushMessageAction(false, 'deleted');
        this.errorMessageSubject.next(err);
        return EMPTY;
      }),
      startWith(null)
    ),
  ]).pipe(
    mergeMap(() => this.transactionsService.transactions$),
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );

  constructor(
    private transactionsService: TransactionsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirmDelete(transaction) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this transaction?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.transactionsService.pushChoiceDeleteTransaction(transaction);
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
