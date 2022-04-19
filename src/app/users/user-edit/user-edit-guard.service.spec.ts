import { TestBed } from '@angular/core/testing';

import { UserEditGuardService } from './user-edit-guard.service';

describe('UserEditGuardService', () => {
  let service: UserEditGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEditGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
