import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Iusers } from '../users';
import { UsersService } from '../users.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [ConfirmationService],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  user: Iusers;
  isUpdating: boolean = false;
  displayModal: boolean;
  userEditSubscriptions: Subscription[] = [];

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

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userEditSubscriptions.push(
      this.usersService.getId(id).subscribe({
        next: (user) => this.displayUser(user),
        error: (error) => console.error(error),
      })
    );
  }

  ngOnDestroy(): void {
    this.userEditSubscriptions.forEach((subscription) => subscription.unsubscribe());
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
      this.userEditSubscriptions.push(
        this.usersService.updateUser(this.user.id, this.userForm.value).subscribe({
          next: () => {
            this.usersService.changeUpdateUserSuccess(true);
            this.router.navigate(['/users']);
          },
          error: (error) => {
            console.error(error);
            this.usersService.changeUpdateUserSuccess(false);
          },
        })
      );
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
        this.userEditSubscriptions.push(
          this.usersService.deleteUser(this.user.id).subscribe({
            next: () => {
              this.usersService.changeUpdateDeleteUser(true);
              this.router.navigate(['/users']);
            },
            error: (error) => {
              console.error(error);
              this.usersService.changeUpdateDeleteUser(false);
            },
          })
        );
      },
      reject: null,
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  changeAnswerModal(value: boolean) {
    this.answerModal.next(value);
  }

  modalChoice(event): void {
    this.displayModal = false;
    this.changeAnswerModal(event.target.innerText === 'Yes' ? true : false);
  }
}
