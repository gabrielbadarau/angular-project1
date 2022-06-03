import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Iusers } from '@project1/core-data';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailComponent {
  @Input() errorMessage: string = '';
  @Input() user:Iusers | undefined
}
