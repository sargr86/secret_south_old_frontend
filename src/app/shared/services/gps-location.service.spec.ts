import { TestBed } from '@angular/core/testing';

import { GpsLocationService } from './gps-location.service';

describe('GpsLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpsLocationService = TestBed.get(GpsLocationService);
    expect(service).toBeTruthy();
  });
});
