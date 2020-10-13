import { TestBed } from '@angular/core/testing';

import { AppGlobalRippleOptionsService } from './app-global-ripple-options.service';

describe('AppGlobalRippleOptionsService', () => {
  let service: AppGlobalRippleOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGlobalRippleOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
