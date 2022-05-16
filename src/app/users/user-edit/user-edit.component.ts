import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { Iusers } from '../users';
import { UsersService } from '../users.service';
import { ConfirmationService } from 'primeng/api';
import { UsersPageActions } from '../state/actions';
import { selectUsersError, selectUserWithId } from '../state';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ConfirmationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup;
  user: Iusers;
  isUpdating = false;
  showModal = false;

  user$ = this.store.pipe(
    select(selectUserWithId),
    tap((data) => (data ? this.displayUser(data) : this.store.dispatch(UsersPageActions.getUsersList())))
  );
  errorMessage$ = this.store.pipe(select(selectUsersError));

  private displayModalSubject = new Subject<boolean>();
  displayModal$ = this.displayModalSubject.asObservable().pipe(tap((data) => (this.showModal = data)));

  private answerModal = new Subject<boolean>();
  selectAnswerModal$ = this.answerModal.asObservable();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private store: Store<State>
  ) {}

  showModalAction(value: boolean) {
    this.displayModalSubject.next(value);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersPageActions.setUserId({ id: +this.route.snapshot.paramMap.get('id') }));
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      id: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      permissions: ['', Validators.required],
    });
  }

  displayUser(user: Iusers): void {
    if (this.userForm) {
      this.userForm.reset();
    }
    this.user = user;
    this.userForm.setValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      id: this.user.id,
      email: this.user.email,
      password: this.user.password,
      role: this.user.role,
      permissions: this.user.permissions,
    });
  }

  save(): void {
    this.isUpdating = true;
    if (this.userForm.dirty) {
      this.store.dispatch(UsersPageActions.updateUsersList({ user: this.userForm.value }));
      this.router.navigate(['/users']);
    } else {
      this.router.navigate(['/users']);
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.store.dispatch(UsersPageActions.deleteUser({ id: this.user.id }));
        this.router.navigate(['/users']);
      },
      reject: null,
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  modalChoice(event): void {
    this.answerModal.next(event.target.innerText === 'Yes' ? true : false);
    this.showModalAction(false);
  }
}
