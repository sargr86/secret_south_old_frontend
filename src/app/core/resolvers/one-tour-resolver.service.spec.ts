import { TestBed } from '@angular/core/testing';

import { OneTourResolverService } from './one-tour-resolver.service';

describe('OneTourResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneTourResolverService = TestBed.get(OneTourResolverService);
    expect(service).toBeTruthy();
  });
});
