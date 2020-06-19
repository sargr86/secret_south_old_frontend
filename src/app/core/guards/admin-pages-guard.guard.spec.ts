import { TestBed } from '@angular/core/testing';

import { AdminPagesGuardGuard } from './admin-pages-guard.guard';

describe('AdminPagesGuardGuard', () => {
  let guard: AdminPagesGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPagesGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
