import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TransactionsService } from './transactions.service';
import { ProductDetailComponent } from './transaction-detail/product-detail/product-detail.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionEditGuardService } from './transaction-edit/transaction-edit-guard.service';
import { HttpWrapperService } from '../http-wrapper.service';
import { ToastModule } from 'primeng/toast';
import { StoreModule } from '@ngrx/store';
import { transactionsReducer } from './state/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffects } from './state/transactions.effects';

@NgModule({
  declarations: [
    TransactionsListComponent,
    TransactionDetailComponent,
    ProductDetailComponent,
    TransactionEditComponent,
  ],
  imports: [
    ToastModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    CommonModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    InputTextModule,
    RouterModule.forChild([
      {
        path: 'transactions/:id/edit',
        canDeactivate: [TransactionEditGuardService],
        component: TransactionEditComponent,
      },
      {
        path: 'transactions/:id',
        component: TransactionDetailComponent,
        children: [{ path: 'product/:id', component: ProductDetailComponent }],
      },
      { path: 'transactions', component: TransactionsListComponent },
    ]),
    StoreModule.forFeature('transactions', transactionsReducer),
    EffectsModule.forFeature([TransactionsEffects]),
  ],
  providers: [HttpWrapperService, TransactionsService, TransactionEditGuardService],
})
export class TransactionsModule {}
