import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subject, tap } from 'rxjs';
import { Iusers } from '../users';
import { ConfirmationService } from 'primeng/api';
import { UsersService } from '../users.service';

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

  user$ = this.usersService
    .getByKey(+this.route.snapshot.paramMap.get('id'))
    .pipe(tap((data) => this.displayUser(data)));
  errorMessage$ = this.usersService.errors$.pipe(map((data) => data.payload.data.error.message));

  private displayModalSubject = new Subject<boolean>();
  displayModal$ = this.displayModalSubject.asObservable().pipe(tap((data) => (this.showModal = data)));

  private answerModal = new Subject<boolean>();
  selectAnswerModal$ = this.answerModal.asObservable();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private usersService: UsersService
  ) {}

  showModalAction(value: boolean) {
    this.displayModalSubject.next(value);
  }

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
      this.usersService.update(this.userForm.value);
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
        this.usersService.delete(this.user.id);
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
