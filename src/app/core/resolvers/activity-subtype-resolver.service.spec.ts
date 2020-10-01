import { TestBed } from '@angular/core/testing';

import { ActivitySubtypeResolverService } from './activity-subtype-resolver.service';

describe('ActivitySubtypeResolverService', () => {
  let service: ActivitySubtypeResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitySubtypeResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
