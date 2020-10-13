import { TestBed } from '@angular/core/testing';

import { OneActivitySubtypeResolverService } from './one-activity-subtype-resolver.service';

describe('OneActivitySubtypeResolverService', () => {
  let service: OneActivitySubtypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneActivitySubtypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
