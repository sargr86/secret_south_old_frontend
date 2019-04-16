import { TestBed } from '@angular/core/testing';

import { PartnerTypeResolverService } from './partner-type-resolver.service';

describe('PartnerTypeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartnerTypeResolverService = TestBed.get(PartnerTypeResolverService);
    expect(service).toBeTruthy();
  });
});
