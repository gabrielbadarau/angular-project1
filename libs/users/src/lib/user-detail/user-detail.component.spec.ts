import { CommonModule } from '@angular/common';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { UserDetailComponent } from './user-detail.component';

describe('UsersDetail Presentational Component', () => {
    let spectator: Spectator<UserDetailComponent>;
    const createComponent = createComponentFactory({
        component: UserDetailComponent,
        imports: [CommonModule],
    });

    beforeEach(() => spectator = createComponent());

    it('UsersDetail should exist', () => {
        expect(spectator.component).toBeTruthy();
    });

    it('Error message test', () => {
        expect(spectator.query('.p-error')).toBeFalsy();
        spectator.setInput('errorMessage', 'Houston, we have an error')
        expect(spectator.query('.p-error')).toBeTruthy();
    });

});