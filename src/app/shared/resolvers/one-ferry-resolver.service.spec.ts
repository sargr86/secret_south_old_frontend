import { TestBed } from '@angular/core/testing';

import { OneFerryResolverService } from './one-ferry-resolver.service';

describe('OneFerryResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneFerryResolverService = TestBed.get(OneFerryResolverService);
    expect(service).toBeTruthy();
  });
});
