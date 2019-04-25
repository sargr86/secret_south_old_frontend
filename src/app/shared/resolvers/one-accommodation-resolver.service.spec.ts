import { TestBed } from '@angular/core/testing';

import { OneAccommodationResolverService } from './one-accommodation-resolver.service';

describe('OneAccommodationResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneAccommodationResolverService = TestBed.get(OneAccommodationResolverService);
    expect(service).toBeTruthy();
  });
});
