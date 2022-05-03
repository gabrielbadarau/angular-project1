import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, Subject, take, tap } from 'rxjs';
import { Iusers } from '../users';
import { UsersService } from '../users.service';
import { ConfirmationService } from 'primeng/api';

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
  displayModal: boolean;

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private answerModal = new Subject<boolean>();
  selectAnswerModal$ = this.answerModal.asObservable();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      id: [null, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      permissions: ['', Validators.required],
    });
    this.usersService
      .getId(+this.route.snapshot.paramMap.get('id'))
      .pipe(
        tap((data) => this.displayUser(data)),
        catchError((err) => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        }),
        take(1)
      )
      .subscribe();
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
      this.usersService
        .updateUser(this.user.id, this.userForm.value)
        .pipe(
          tap(() => this.usersService.pushMessageAction(true, 'updated')),
          catchError((err) => {
            this.usersService.pushMessageAction(false, 'updated');
            this.errorMessageSubject.next(err);
            return EMPTY;
          }),
          take(1)
        )
        .subscribe();
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
        this.usersService
          .deleteUser(this.user.id)
          .pipe(
            tap(() => this.usersService.pushMessageAction(true, 'deleted')),
            catchError((err) => {
              this.usersService.pushMessageAction(false, 'deleted');
              this.errorMessageSubject.next(err);
              return EMPTY;
            }),
            take(1)
          )
          .subscribe();
        this.router.navigate(['/users']);
      },
      reject: null,
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  modalChoice(event): void {
    this.displayModal = false;
    this.answerModal.next(event.target.innerText === 'Yes' ? true : false);
  }
}
