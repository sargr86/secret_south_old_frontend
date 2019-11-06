import { TestBed } from '@angular/core/testing';

import { CompanyResolverService } from './company-resolver.service';

describe('CompanyResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyResolverService = TestBed.get(CompanyResolverService);
    expect(service).toBeTruthy();
  });
});
