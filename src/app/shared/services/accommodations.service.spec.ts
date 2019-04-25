import { TestBed } from '@angular/core/testing';

import { AccommodationsService } from './accommodations.service';

describe('AccommodationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccommodationsService = TestBed.get(AccommodationsService);
    expect(service).toBeTruthy();
  });
});
