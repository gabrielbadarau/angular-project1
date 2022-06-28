import { TestBed } from '@angular/core/testing';

import { TransactionEditGuardService } from './transaction-edit-guard.service';

describe('TransactionEditGuardService', () => {
  let service: TransactionEditGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionEditGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
