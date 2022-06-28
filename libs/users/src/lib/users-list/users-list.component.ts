import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Iusers } from '@project1/core-data';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  @Input() errorMessage: string = '';
  @Input() users: Iusers[] = [];
  @Input() toastMessage: [boolean, string] | undefined;
  @Output() confirmDelete = new EventEmitter<Iusers>();

  clickDelete(value: Iusers) {
    this.confirmDelete.emit(value);
  }
}
