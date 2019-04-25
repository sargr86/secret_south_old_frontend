import { TestBed } from '@angular/core/testing';

import { OneActivityResolverService } from './one-activity-resolver.service';

describe('OneActivityResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneActivityResolverService = TestBed.get(OneActivityResolverService);
    expect(service).toBeTruthy();
  });
});
