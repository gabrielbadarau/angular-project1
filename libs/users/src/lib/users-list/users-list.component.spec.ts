import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { UsersListComponent } from './users-list.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<UsersListComponent>;
  const createComponent = createComponentFactory(UsersListComponent);

  beforeEach(() => spectator = createComponent());

  it('should have a success class by default', () => {
    expect(spectator.component).toBeDefined();
  });


});