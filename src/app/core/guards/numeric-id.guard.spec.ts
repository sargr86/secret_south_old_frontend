import { TestBed } from '@angular/core/testing';

import { NumericIdGuard } from './numeric-id.guard';

describe('NumericIdGuard', () => {
  let guard: NumericIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NumericIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
